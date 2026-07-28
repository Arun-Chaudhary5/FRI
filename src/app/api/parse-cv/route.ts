import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(ip, "expensive", 5, 60000); // 5 cv parses per minute max
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No CV file uploaded" }, { status: 400 });
    }

    // 1. File Size Validation (Max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 5MB limit" }, { status: 400 });
    }

    // 2. MIME Type Validation
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Only PDF is allowed." }, { status: 400 });
    }

    // 3. Extension Validation
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Invalid file extension. Only .pdf is allowed." }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.warn("[Configuration] GROQ_API_KEY is missing");
      return NextResponse.json({ error: "CV analysis is temporarily unavailable." }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Magic Bytes Validation for PDF
    // PDF magic bytes are %PDF- (25 50 44 46 2D)
    if (buffer.length < 5 || buffer.toString('utf-8', 0, 5) !== "%PDF-") {
       return NextResponse.json({ error: "Invalid file format. Does not appear to be a PDF." }, { status: 400 });
    }

    // 1. PDF Extraction Layer
    let extractedText = "";
    try {
      const pdf = (await import("pdf-parse")).default || (await import("pdf-parse"));
      const data = await pdf(buffer);
      extractedText = data.text;
    } catch (e: unknown) {
      const err = e as Error;
      console.error("[PDF Parse Error]", err.stack);
      return NextResponse.json({ error: "Unable to process this PDF. Please try another file." }, { status: 400 });
    }

    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json({ error: "Empty PDF text extracted" }, { status: 400 });
    }

    // 2. LLM Extraction Layer (Groq)
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const prompt = `
      You are an expert academic and technical recruiter. 
      I will provide you with the raw text extracted from a student's CV.
      Your task is to parse this CV and extract the following information into a strict JSON object.
      
      JSON Structure Required:
      {
        "name": "Full Name",
        "email": "Email Address",
        "university": "Current University",
        "degree": "Degree (e.g. BS Computer Science)",
        "expectedGraduation": "Year of Graduation",
        "skills": "Comma separated list of technical skills",
        "projects": "Short summary of key projects",
        "workExperience": "Short summary of work experience",
        "researchInterests": "Comma separated list of inferred research interests"
      }
      
      Here is the CV Text:
      ${extractedText.substring(0, 20000)}
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "";
    const parsedData = JSON.parse(text.trim());

    return NextResponse.json({ success: true, profile: parsedData });

  } catch (error: unknown) {
    console.error("[CV Parsing] Fatal error:", error);
    return NextResponse.json({ error: "CV analysis is temporarily unavailable." }, { status: 500 });
  }
}
