import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { z } from "zod";

const GENERIC_EMAILS = ["info", "admin", "webmaster", "support", "office", "contact", "hello"];
import { rateLimit } from "@/lib/rate-limit";

// Helper to clean basic obfuscation
function cleanEmail(text: string): string {
  return text.toLowerCase()
    .replace(/\[at\]/g, "@")
    .replace(/\(at\)/g, "@")
    .replace(/\s+at\s+/g, "@")
    .replace(/\[dot\]/g, ".")
    .replace(/\(dot\)/g, ".")
    .replace(/\s+dot\s+/g, ".")
    .trim();
}

function extractCandidateEmails(text: string | null): string[] {
  if (!text) return [];
  // basic regex for emails including obfuscated
  const rawRegex = /([a-zA-Z0-9._-]+(?:(?:\[at\])|(?:\(at\))|(?:\s+at\s+)|@)[a-zA-Z0-9._-]+(?:(?:\[dot\])|(?:\(dot\))|(?:\s+dot\s+)|\.)[a-zA-Z]{2,})/gi;
  const matches = text.match(rawRegex) || [];
  
  const emails = matches.map(cleanEmail);
  return Array.from(new Set(emails)); // Deduplicate
}

function validateEmail(email: string, profName: string, domainHint: string): boolean {
  if (!email.includes("@")) return false;
  const [local, domain] = email.split("@");
  
  // Reject generics
  if (GENERIC_EMAILS.includes(local)) return false;
  
  // Check if last name is in the email local part (common academic format)
  const nameParts = profName.toLowerCase().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1];
  
  if (local.includes(lastName)) return true;
  if (nameParts.length > 1 && local.includes(nameParts[0].charAt(0) + lastName)) return true; // flastname
  
  // If it matches the exact university domain, it's a stronger signal
  if (domainHint && domain.includes(domainHint)) return true;

  return false;
}

const FindEmailSchema = z.object({
  professorId: z.string().min(1).max(50)
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(ip, "email", 5, 60000); // 5 emails per minute
    if (!rl.success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    if (!process.env.SERPER_API_KEY) {
      console.warn("[Configuration] SERPER_API_KEY is missing. Email discovery will have reduced accuracy.");
    }
    if (!process.env.HUNTER_API_KEY) {
      console.warn("[Configuration] HUNTER_API_KEY is missing. Email discovery fallback disabled.");
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsedBody = FindEmailSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid input", details: parsedBody.error.issues }, { status: 400 });
    }

    const { professorId } = parsedBody.data;

    const professor = await prisma.professor.findUnique({
      where: { id: professorId, userId: user.id }
    });

    if (!professor || !professor.name) {
      return NextResponse.json({ error: "Professor not found or invalid" }, { status: 404 });
    }

    // CACHE CHECK: If already verified, return cached
    if (professor.email && ["VERIFIED_PUBLIC", "PROVIDER_VERIFIED"].includes(professor.emailStatus)) {
      return NextResponse.json({ 
        success: true, 
        email: professor.email, 
        emailStatus: professor.emailStatus,
        emailConfidence: professor.emailConfidence,
        emailSource: professor.emailSource,
        emailSourceUrl: professor.emailSourceUrl
      });
    }

    let authoritativeDomain = "";
    if (professor.homepage && professor.homepage.includes(".")) {
      try {
        const url = new URL(professor.homepage.startsWith("http") ? professor.homepage : `https://${professor.homepage}`);
        authoritativeDomain = url.hostname.replace("www.", "");
      } catch (e) {}
    }

    // PHASE 1: Existing Content Scan
    const existingContent = [professor.homepage, professor.rawScrapedText].filter(Boolean).join(" ");
    const candidateEmails = extractCandidateEmails(existingContent);
    
    for (const email of candidateEmails) {
      if (validateEmail(email, professor.name, authoritativeDomain)) {
        // We found a strong match in existing content
        const updated = await prisma.professor.update({
          where: { id: professorId },
          data: {
            email: email,
            emailStatus: "VERIFIED_PUBLIC",
            emailConfidence: 95,
            emailSource: "Existing academic content",
            emailSourceUrl: professor.homepage || undefined,
            emailLastChecked: new Date()
          }
        });
        return NextResponse.json({ success: true, email: updated.email, emailStatus: updated.emailStatus, emailConfidence: updated.emailConfidence, emailSource: updated.emailSource, emailSourceUrl: updated.emailSourceUrl });
      }
    }

    // PHASE 2: Academic Domain Search via Serper
    if (authoritativeDomain && process.env.SERPER_API_KEY) {
      const searchQueries = [
        `"${professor.name}" email site:${authoritativeDomain}`,
        `"${professor.name}" contact site:${authoritativeDomain}`
      ];
      
      let foundViaSearch = false;
      let foundEmail = "";
      let foundUrl = "";

      for (const query of searchQueries) {
        if (foundViaSearch) break;
        
        try {
          const serperRes = await fetch("https://google.serper.dev/search", {
            method: "POST",
            headers: {
              "X-API-KEY": process.env.SERPER_API_KEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ q: query, num: 3 })
          });

          if (serperRes.ok) {
            const data = await serperRes.json();
            const results = data.organic || [];
            
            for (const res of results) {
              const snippetEmails = extractCandidateEmails(res.snippet);
              for (const email of snippetEmails) {
                if (validateEmail(email, professor.name, authoritativeDomain)) {
                  foundViaSearch = true;
                  foundEmail = email;
                  foundUrl = res.link;
                  break;
                }
              }
              if (foundViaSearch) break;
            }
          }
        } catch (e) {
          console.error("Serper search failed:", e);
        }
      }

      if (foundViaSearch && foundEmail) {
        const updated = await prisma.professor.update({
          where: { id: professorId },
          data: {
            email: foundEmail,
            emailStatus: "VERIFIED_PUBLIC",
            emailConfidence: 90,
            emailSource: "Public Academic Search",
            emailSourceUrl: foundUrl,
            emailLastChecked: new Date()
          }
        });
        return NextResponse.json({ success: true, email: updated.email, emailStatus: updated.emailStatus, emailConfidence: updated.emailConfidence, emailSource: updated.emailSource, emailSourceUrl: updated.emailSourceUrl });
      }
    }

    // PHASE 3: Hunter Fallback
    if (authoritativeDomain && process.env.HUNTER_API_KEY) {
      const nameParts = professor.name.split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];

      try {
        const hunterUrl = `https://api.hunter.io/v2/email-finder?domain=${encodeURIComponent(authoritativeDomain)}&first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&api_key=${process.env.HUNTER_API_KEY}`;
        
        const hunterRes = await fetch(hunterUrl);
        
        if (hunterRes.ok) {
          const hunterData = await hunterRes.json();
          if (hunterData.data && hunterData.data.email) {
            const updated = await prisma.professor.update({
              where: { id: professorId },
              data: {
                email: hunterData.data.email,
                emailStatus: "PROVIDER_VERIFIED",
                emailConfidence: hunterData.data.score || 85,
                emailSource: "Hunter API",
                emailSourceUrl: undefined,
                emailLastChecked: new Date()
              }
            });
            return NextResponse.json({ success: true, email: updated.email, emailStatus: updated.emailStatus, emailConfidence: updated.emailConfidence, emailSource: updated.emailSource });
          }
        } else {
          console.error("Hunter API Error:", hunterRes.status, hunterRes.statusText);
        }
      } catch (e) {
        console.error("Hunter fetch failed:", e);
      }
    }

    // PHASE 4: Not Found
    const notFound = await prisma.professor.update({
      where: { id: professorId },
      data: {
        emailStatus: "NOT_FOUND",
        emailConfidence: 0,
        emailLastChecked: new Date()
      }
    });

    return NextResponse.json({ 
      success: false, 
      emailStatus: "NOT_FOUND", 
      email: professor.email || null 
    });

  } catch (error: any) {
    console.error("[Email Discovery] Fatal error:", error.message);
    return NextResponse.json({ error: "Email discovery is temporarily unavailable." }, { status: 500 });
  }
}
