import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    console.log("===== PROFESSORS AUTH DEBUG =====");
    console.log("Session:", session);
    console.log("User:", session?.user);
    console.log("User ID:", session?.user?.id);
    console.log("Email:", session?.user?.email);
    console.log("authOptions defined:", !!authOptions);

    if (!session?.user?.id) {
      console.log("Condition !session?.user?.id evaluated to TRUE.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Condition !session?.user?.id evaluated to FALSE.");

    const professors = await prisma.professor.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });
    
    return NextResponse.json({ professors });
  } catch (error) {
    console.error("Failed to fetch professors:", error);
    return NextResponse.json({ error: "Failed to fetch professors" }, { status: 500 });
  }
}
