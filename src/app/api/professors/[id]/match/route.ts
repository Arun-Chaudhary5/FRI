import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Groq from "groq-sdk";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(ip, "expensive", 10, 60000); // 10 requests per minute
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const { id: professorId } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    const sessionEmail = session.user.email;

    if (!process.env.GROQ_API_KEY) {
      console.warn("[Configuration] GROQ_API_KEY is missing");
      return NextResponse.json({ error: "Compatibility matching is temporarily unavailable." }, { status: 500 });
    }

    // 1. Fetch User (by Email, or fallback link)
    let user = await prisma.user.findUnique({
      where: { email: sessionEmail }
    });

    // If user not found by email, try to link an orphaned profile
    if (!user) {
      const orphanedUser = await prisma.user.findFirst({
        where: { email: null },
        orderBy: { createdAt: 'desc' }
      });
      if (orphanedUser) {
        user = await prisma.user.update({
          where: { id: orphanedUser.id },
          data: { email: sessionEmail }
        });
      }
    }

    if (!user) {
      return NextResponse.json({ error: "User profile not found. Please complete onboarding." }, { status: 400 });
    }

    // 2. Fetch Professor and verify ownership
    const professor = await prisma.professor.findUnique({
      where: { id: professorId, userId: user.id }
    });

    if (!professor) {
      return NextResponse.json({ error: "Professor not found or unauthorized" }, { status: 404 });
    }

    // 3. Construct AI Prompt for Match Engine
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
      You are an expert academic recruiter and PhD admissions consultant.
      I will provide you with a Student's Profile and a Professor's Research Profile.
      Your task is to analyze how well the student matches the professor's lab.
      
      STUDENT PROFILE:
      Name: ${user.name}
      Education: ${user.degree} at ${user.university}
      Skills: ${user.skills}
      Experience/Projects: ${user.projects} ${user.workExperience}
      Research Interests: ${user.researchInterests} ${user.preferredResearchAreas}
      
      PROFESSOR PROFILE:
      Name: ${professor.name}
      University: ${professor.university}
      Primary Areas: ${professor.primaryAreas}
      Current Themes: ${professor.currentThemes}
      Keywords: ${professor.keywords}
      AI Summary: ${professor.aiAnalysisSummary}
      
      OUTPUT REQUIREMENTS:
      Analyze the synergy between the student and the professor. Output exactly a JSON object with the following structure.
      {
        "compatibilityScore": 85, 
        "compatibilityReasoning": "A short, punchy paragraph explaining why they match or don't match.",
        "talkingPoints": ["Specific point connecting student project X to professor paper Y", "Point connecting skill Z to lab theme W"]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "";
    const parsedData = JSON.parse(text.trim());

    // 4. Update Professor in DB
    const updatedProfessor = await prisma.professor.update({
      where: { id: professorId },
      data: {
        compatibilityScore: parsedData.compatibilityScore,
        compatibilityReasoning: parsedData.compatibilityReasoning,
        notes: JSON.stringify({ talkingPoints: parsedData.talkingPoints }),
        status: "DRAFTED"
      }
    });

    return NextResponse.json({ success: true, match: parsedData, professor: updatedProfessor });

  } catch (error: unknown) {
    console.error("[Match] Fatal error:", error);
    return NextResponse.json({ error: "Compatibility matching is temporarily unavailable." }, { status: 500 });
  }
}
