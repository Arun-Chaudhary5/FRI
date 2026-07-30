import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
