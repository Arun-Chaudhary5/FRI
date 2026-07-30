import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    console.log("[PROFILE] Request received");
    const data = await req.json();
    
    console.log("[PROFILE] Authentication check");
    const session = await getServerSession(authOptions);
    console.log(`[PROFILE] Authenticated: ${!!session?.user}`);
    
    let userEmail = session?.user?.email;
    let userId = session?.user?.id;
    console.log(`[PROFILE] User Email available: ${!!userEmail}`);
    console.log(`[PROFILE] User ID available: ${!!userId}`);

    // Basic check for parsed structure
    console.log(`[PROFILE] Request validation passed`);
    console.log(`[PROFILE] parsed profile exists: ${!!data.profile}`);
    console.log(`[PROFILE] name present: ${!!data.profile?.name}`);
    console.log(`[PROFILE] education present: ${!!data.profile?.university}`);
    console.log(`[PROFILE] skills type: ${typeof data.parsedCV?.skills}`);
    console.log(`[PROFILE] research interests type: ${typeof data.parsedCV?.researchInterests}`);

    // We will stringify the JSON arrays for the SQLite schema
    const parsedDataStr = {
      skills: JSON.stringify(data.parsedCV?.skills || []),
      programmingLanguages: JSON.stringify(data.parsedCV?.programmingLanguages || []),
      frameworks: JSON.stringify(data.parsedCV?.frameworks || []),
      researchExperience: JSON.stringify(data.parsedCV?.researchExperience || []),
      projects: JSON.stringify(data.parsedCV?.projects || []),
      leadershipRoles: JSON.stringify(data.parsedCV?.leadershipRoles || []),
      awards: JSON.stringify(data.parsedCV?.awards || []),
      workExperience: JSON.stringify(data.parsedCV?.workExperience || []),
      publications: JSON.stringify(data.parsedCV?.publications || []),
      researchInterests: JSON.stringify(data.parsedCV?.researchInterests || []),
      technicalStack: JSON.stringify(data.parsedCV?.technicalStack || []),
      domainExpertise: JSON.stringify(data.parsedCV?.domainExpertise || [])
    };

    const userData = {
      name: data.profile?.name || null,
      university: data.profile?.university || null,
      degree: data.profile?.degree || null,
      department: data.profile?.department || null,
      expectedGraduation: data.profile?.expectedGraduation || null,
      linkedin: data.profile?.linkedin || null,
      preferredResearchAreas: data.preferences?.preferredResearchAreas || null,
      targetCountries: data.preferences?.targetCountries || null,
      internshipDuration: data.preferences?.internshipDuration || null,
      ...parsedDataStr
    };

    let user;

    console.log("[PROFILE] Database operation starting");
    if (userEmail) {
      // Upsert by email if we have one
      user = await prisma.user.upsert({
        where: { email: userEmail },
        update: userData,
        create: {
          ...userData,
          email: userEmail
        }
      });
    } else {
      // Fallback: create an unlinked user if no email is provided at all
      user = await prisma.user.create({
        data: userData
      });
    }
    console.log("[PROFILE] Database operation completed");

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("[PROFILE] Save failed");
    if (error instanceof Error) {
      console.error("[PROFILE] Error name:", error.name);
      console.error("[PROFILE] Error message:", error.message);
      if ((error as any).code) {
         console.error("[PROFILE] Prisma Error code:", (error as any).code);
      }
    } else {
      console.error("[PROFILE] Unknown error type:", error);
    }
    return NextResponse.json({ error: "Failed to save profile." }, { status: 500 });
  }
}
