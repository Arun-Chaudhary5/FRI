import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    let userEmail = session?.user?.email;

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
      name: data.profile.name,
      university: data.profile.university,
      degree: data.profile.degree,
      department: data.profile.department,
      expectedGraduation: data.profile.expectedGraduation,
      linkedin: data.profile.linkedin,
      preferredResearchAreas: data.preferences.preferredResearchAreas,
      targetCountries: data.preferences.targetCountries,
      internshipDuration: data.preferences.internshipDuration,
      ...parsedDataStr
    };

    let user;

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

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Failed to save profile:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
