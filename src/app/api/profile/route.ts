import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProfileSchema = z.object({
  profile: z.object({
    name: z.string().optional(),
    university: z.string().optional(),
    degree: z.string().optional(),
    department: z.string().optional(),
    expectedGraduation: z.string().optional(),
    linkedin: z.string().optional(),
  }).optional(),
  preferences: z.object({
    preferredResearchAreas: z.string().optional(),
    targetCountries: z.string().optional(),
    internshipDuration: z.string().optional(),
  }).optional(),
  parsedCV: z.object({
    skills: z.array(z.string()).optional(),
    programmingLanguages: z.array(z.string()).optional(),
    frameworks: z.array(z.string()).optional(),
    researchExperience: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional(),
    leadershipRoles: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
    workExperience: z.array(z.string()).optional(),
    publications: z.array(z.string()).optional(),
    researchInterests: z.array(z.string()).optional(),
    technicalStack: z.array(z.string()).optional(),
    domainExpertise: z.array(z.string()).optional(),
  }).optional()
});

export async function POST(req: NextRequest) {
  try {
    const rawData = await req.json();
    const parsed = ProfileSchema.safeParse(rawData);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid profile data provided.", details: parsed.error.issues }, { status: 400 });
    }
    
    const data = parsed.data;
    
    const session = await getServerSession(authOptions);
    let userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized. Please log in to save your profile." }, { status: 401 });
    }

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

    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: userData,
      create: {
        ...userData,
        email: userEmail
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("[PROFILE] Save failed:", error.message);
    return NextResponse.json({ error: "Failed to save profile." }, { status: 500 });
  }
}
