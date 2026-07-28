import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(ip, "expensive", 3, 60000); // 3 requests per minute
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    console.log("[AUTO-DISCOVER] Request received");

    // STEP 1: Resolving current user
    console.log("[AUTO-DISCOVER] STEP 1: Resolving current user");
    const session = await getServerSession(authOptions);
    console.log(`[AUTO-DISCOVER] user found: ${!!session?.user}`);
    console.log(`[AUTO-DISCOVER] user id present: ${!!session?.user?.email}`);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    const sessionEmail = session.user.email;

    // STEP 2: Loading profile
    console.log("[AUTO-DISCOVER] STEP 2: Loading profile");
    let user = await prisma.user.findUnique({
      where: { email: sessionEmail }
    });

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

    console.log(`[AUTO-DISCOVER] profile found: ${!!user}`);
    if (!user) {
      return NextResponse.json({ error: "User not found. Please complete onboarding first." }, { status: 400 });
    }

    // STEP 3: Loading CV/preferences
    console.log("[AUTO-DISCOVER] STEP 3: Loading CV/preferences");
    const hasCvData = !!user.skills || !!user.researchExperience || !!user.workExperience;
    const hasInterests = !!user.researchInterests || !!user.preferredResearchAreas;
    console.log(`[AUTO-DISCOVER] CV/profile data available: ${hasCvData}`);
    console.log(`[AUTO-DISCOVER] research interests available: ${hasInterests}`);

    if (!process.env.SERPER_API_KEY) {
      throw new Error("SERPER_API_KEY not configured");
    }
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY not configured");
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const groqModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    // STEP 4: Generating search query
    console.log("[AUTO-DISCOVER] STEP 4: Generating search query");
    const queryPrompt = `
      You are an expert academic recruiter. Given the student's profile, generate exactly 3 highly targeted Google search queries to find potential PhD/Research advisors (professors/labs).
      The queries should prioritize academic sources, using terms like "professor", "research lab", "faculty", or "principal investigator".
      
      STUDENT PROFILE:
      Skills: ${user.skills}
      Research Interests: ${user.researchInterests}
      Target Areas: ${user.preferredResearchAreas}
      Target Countries: ${user.targetCountries}
      
      OUTPUT FORMAT (JSON ONLY):
      {
        "queries": [
          "query 1",
          "query 2",
          "query 3"
        ]
      }
    `;

    const queryCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: queryPrompt }],
      model: groqModel,
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    let searchQueries = [];
    try {
      const parsedQueries = JSON.parse(queryCompletion.choices[0]?.message?.content || "{}");
      searchQueries = parsedQueries.queries || [];
    } catch (e) {
      // Ignored
    }
    
    if (searchQueries.length === 0) {
      const fallbackTopic = user.preferredResearchAreas ? JSON.parse(user.preferredResearchAreas).join(" ") : "Machine Learning";
      searchQueries = [`${fallbackTopic} professor research lab site:.edu`];
    }
    console.log(`[AUTO-DISCOVER] query: ${searchQueries[0]}`);

    // STEP 5: Calling search provider
    console.log("[AUTO-DISCOVER] STEP 5: Calling search provider");
    let allOrganicResults: any[] = [];
    
    for (const sq of searchQueries.slice(0, 3)) {
      const serperRes = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ q: sq, num: 10 })
      });
      
      console.log(`[AUTO-DISCOVER] provider: Serper (google.serper.dev)`);
      console.log(`[AUTO-DISCOVER] HTTP status: ${serperRes.status}`);
      console.log(`[AUTO-DISCOVER] statusText: ${serperRes.statusText}`);
      
      if (!serperRes.ok) {
        let safeBody = "Could not read body";
        try {
            safeBody = await serperRes.text();
        } catch(e) {}
        console.log(`[AUTO-DISCOVER] safe response body: ${safeBody}`);
        continue;
      }

      const serperData = await serperRes.json();
      allOrganicResults.push(...(serperData.organic || []));
    }

    console.log(`[AUTO-DISCOVER] results returned: ${allOrganicResults.length}`);
    if (allOrganicResults.length === 0) {
      return NextResponse.json({ error: "No search results found from provider." }, { status: 404 });
    }

    // STEP 6: Processing candidates
    console.log("[AUTO-DISCOVER] STEP 6: Processing candidates");
    const uniqueLinks = new Map();
    for (const res of allOrganicResults) {
      if (res.link && !uniqueLinks.has(res.link)) {
        uniqueLinks.set(res.link, res);
      }
    }
    const candidateResults = Array.from(uniqueLinks.values()).slice(0, 20);
    console.log(`[AUTO-DISCOVER] candidate count: ${candidateResults.length}`);

    // STEP 7: AI analysis
    console.log("[AUTO-DISCOVER] STEP 7: AI analysis");
    console.log(`[AUTO-DISCOVER] model: ${groqModel}`);
    const extractPrompt = `
      You are an expert at identifying academic faculty profiles.
      Analyze this list of Google search results and extract the real professors/faculty members.
      Validate that they are actual academic professors or lab directors. Reject students, generic directories, news, or companies.
      
      OUTPUT REQUIREMENTS (JSON):
      Return a JSON array named "professors" containing valid professor objects.
      For each professor, provide:
      {
        "name": "Full Name",
        "university": "Institution Name",
        "homepage": "URL to their profile/lab",
        "primaryAreas": "Comma separated keywords of their research",
        "valid": true
      }
      If a candidate is not a valid academic, or if their name/university cannot be determined, omit them entirely.
      Do NOT output "Unknown" or "Unknown Professor".
      
      SEARCH RESULTS:
      ${JSON.stringify(candidateResults, null, 2)}
    `;

    const extractCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: extractPrompt }],
      model: groqModel,
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    let extractedProfessors = [];
    try {
      const parsedExt = JSON.parse(extractCompletion.choices[0]?.message?.content || "{}");
      extractedProfessors = (parsedExt.professors || []).filter((p: any) => 
        p.name && p.university && 
        p.name !== "Unknown Professor" && 
        p.name !== "Unknown" && 
        p.university !== "Unknown University"
      );
    } catch (e) {
      console.error("[AUTO-DISCOVER] Extraction parse failed.");
    }
    
    // Scoring...
    const scoredProfessors = [];
    let successfulAnalyses = 0;
    let failedAnalyses = 0;
    
    for (const prof of extractedProfessors) {
      const matchPrompt = `
        You are an expert academic recruiter. 
        Compare this student against this professor.
        
        STUDENT:
        Skills: ${user.skills}
        Experience: ${user.researchExperience} ${user.workExperience}
        Interests: ${user.researchInterests}
        
        PROFESSOR:
        Name: ${prof.name}
        University: ${prof.university}
        Research Areas: ${prof.primaryAreas}
        
        Output JSON:
        {
          "compatibilityScore": 85,
          "compatibilityReasoning": "Brief 1-sentence reasoning linking student skills to professor areas."
        }
      `;
      try {
        const matchRes = await groq.chat.completions.create({
          messages: [{ role: "user", content: matchPrompt }],
          model: "llama-3.3-70b-versatile",
          temperature: 0,
          response_format: { type: "json_object" }
        });
        const matchData = JSON.parse(matchRes.choices[0]?.message?.content || "{}");
        scoredProfessors.push({
          ...prof,
          compatibilityScore: matchData.compatibilityScore || 50,
          compatibilityReasoning: matchData.compatibilityReasoning || "Potential match based on shared domain."
        });
        successfulAnalyses++;
      } catch (e) {
        failedAnalyses++;
        scoredProfessors.push({ ...prof, compatibilityScore: 50, compatibilityReasoning: "Fallback scoring applied." });
      }
    }
    
    console.log(`[AUTO-DISCOVER] successful analyses: ${successfulAnalyses}`);
    console.log(`[AUTO-DISCOVER] failed analyses: ${failedAnalyses}`);

    // Sort by score descending and take top 5
    scoredProfessors.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    const top5 = scoredProfessors.slice(0, 5);

    // STEP 8: Database
    console.log("[AUTO-DISCOVER] STEP 8: Database");
    let savedCount = 0;
    const finalProfessors = [];
    
    console.log(`[AUTO-DISCOVER] professors attempted: ${top5.length}`);
    
    for (const prof of top5) {
      const existing = await prisma.professor.findFirst({
        where: {
          userId: user.id,
          name: prof.name,
          university: prof.university
        }
      });

      if (!existing) {
        const saved = await prisma.professor.create({
          data: {
            userId: user.id,
            name: prof.name,
            university: prof.university,
            homepage: prof.homepage,
            primaryAreas: JSON.stringify([prof.primaryAreas]),
            compatibilityScore: prof.compatibilityScore,
            compatibilityReasoning: prof.compatibilityReasoning,
            aiAnalysisSummary: `Automatically discovered based on ${prof.primaryAreas}.`,
            status: "UNCONTACTED"
          }
        });
        finalProfessors.push(saved);
        savedCount++;
      } else {
        finalProfessors.push(existing);
      }
    }

    console.log(`[AUTO-DISCOVER] professors saved: ${savedCount}`);
    console.log("[AUTO-DISCOVER] COMPLETE");
    
    return NextResponse.json({ success: true, count: finalProfessors.length, professors: finalProfessors });
  } catch (error) {
    console.error(
        "[AUTO-DISCOVER] FATAL ERROR:",
        error
    );

    if (error instanceof Error) {
        console.error("[AUTO-DISCOVER] MESSAGE:", error.message);
        console.error("[AUTO-DISCOVER] STACK:", error.stack);
    }

    return NextResponse.json({ error: "Professor discovery failed. Please try again." }, { status: 500 });
  }
}
