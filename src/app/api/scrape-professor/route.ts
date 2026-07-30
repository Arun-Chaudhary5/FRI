import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as cheerio from "cheerio";
import Groq from "groq-sdk";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const ScrapeProfessorSchema = z.object({
  url: z.string().url().max(2000),
  name: z.string().max(100).optional(),
  university: z.string().max(200).optional()
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(ip, "expensive", 5, 60000); // 5 requests per minute
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const sessionUserId = session.user.id;

    const body = await req.json();
    const parsedBody = ScrapeProfessorSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid input", details: parsedBody.error.issues }, { status: 400 });
    }
    const { url, name, university } = parsedBody.data;

    console.log(`[Professor Scrape] Request received for URL: ${url}`);

    if (!url) {
      console.warn("[Professor Scrape] URL is missing");
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Basic SSRF Protection
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return NextResponse.json({ error: "Invalid protocol. Only HTTP/HTTPS are allowed." }, { status: 400 });
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    const isLocalNetwork = 
      hostname === "localhost" || 
      hostname.startsWith("127.") || 
      hostname.startsWith("10.") || 
      hostname.startsWith("192.168.") || 
      hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) ||
      hostname === "::1" ||
      hostname.endsWith(".internal");

    if (isLocalNetwork) {
      return NextResponse.json({ error: "Access to internal networks is forbidden (SSRF Protection)." }, { status: 403 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.warn("[Configuration] GROQ_API_KEY is missing");
      return NextResponse.json({ error: "Professor import is temporarily unavailable." }, { status: 500 });
    }

    // 1. Scrape raw text using Cheerio with a timeout and fallback
    console.log(`[Professor Scrape] Fetching professor website: ${url}`);
    
    let rawText = "";
    let pageTitle = "";
    let pageH1 = "";
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);
        pageTitle = $('title').text().trim();
        pageH1 = $('h1').first().text().trim();
        
        $('script, style, nav, footer, header').remove();
        rawText = $('body').text().replace(/\s+/g, ' ').trim();
        console.log(`[Professor Scrape] Content extracted, length: ${rawText.length}`);
      } else {
        console.warn(`[Professor Scrape] Fetch failed with status ${response.status}. Site blocked scrape.`);
      }
    } catch (e: any) {
      console.warn(`[Professor Scrape] Fetch error (${e.message}). Site blocked scrape or timeout.`);
    }

    if (!rawText || rawText.length < 50) {
      console.log("[Professor Scrape] Falling back to URL inference (site blocked or empty content).");
      rawText = `The user tried to scrape this URL: ${url}. The content was blocked or empty (perhaps it is a Google Scholar page). Please infer what you can from the URL and the provided hints.`;
    }

    const textToAnalyze = rawText.substring(0, 30000); 

    // 2. AI Research Analysis Pipeline
    console.log("[Professor Scrape] AI analysis started");
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
      You are an expert AI research assistant. I am giving you the raw text scraped from a professor's website, lab page, or Google Scholar profile.
      Analyze the text and extract specific details into a structured JSON object.
      
      PAGE METADATA (Highly reliable for identity):
      URL: ${url}
      Title tag: ${pageTitle}
      H1 tag: ${pageH1}
      
      USER HINTS (May be empty/null):
      Name: ${name || 'Unknown'}
      University: ${university || 'Unknown'}
      
      JSON STRUCTURE REQUIRED:
      {
        "name": "Professor's full name (use null if you absolutely cannot verify it)",
        "university": "University name (use null if you absolutely cannot verify it)",
        "position": "e.g., Associate Professor, Director of Lab (or null)",
        "email": "Publicly listed email address from the text (or null)",
        "primaryAreas": "String summarizing their top 2-3 research fields",
        "currentThemes": "String summarizing what their lab is actively working on RIGHT NOW based on recent grants/papers",
        "latestPublications": ["Paper 1 title", "Paper 2 title", "Paper 3 title"],
        "keywords": ["keyword1", "keyword2", "keyword3"],
        "aiAnalysisSummary": "A punchy 3-sentence summary of their lab's culture, focus, and what kind of students they might look for."
      }
      
      RAW TEXT:
      ${textToAnalyze}
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0,
      response_format: { type: "json_object" }
    });

    const text = chatCompletion.choices[0]?.message?.content || "";
    
    let parsedData: any = {};
    try {
      parsedData = JSON.parse(text.trim());
    } catch (e) {
      console.error("[Professor Scrape] Failed to parse Groq response");
    }


    const finalName = parsedData.name && parsedData.name !== "Unknown" ? parsedData.name : (name || "Unknown Professor");
    const finalUniversity = parsedData.university && parsedData.university !== "Unknown" ? parsedData.university : (university || "Unknown University");

    const professor = await prisma.professor.create({
      data: {
        userId: sessionUserId,
        name: finalName,
        university: finalUniversity,
        homepage: url,
        email: parsedData.email || null,
        position: parsedData.position || "",
        primaryAreas: parsedData.primaryAreas || "",
        currentThemes: parsedData.currentThemes || "",
        latestPublications: JSON.stringify(parsedData.latestPublications || []),
        keywords: JSON.stringify(parsedData.keywords || []),
        aiAnalysisSummary: parsedData.aiAnalysisSummary || "",
        status: "DISCOVERED"
      }
    });

    return NextResponse.json({ success: true, professor, professorId: professor.id });

  } catch (error: any) {
    console.error("[Professor Scrape] Fatal error:", error);
    return NextResponse.json({ error: "Professor import is temporarily unavailable." }, { status: 500 });
  }
}
