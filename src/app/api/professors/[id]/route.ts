import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const { id: professorId } = await params;
    
    const professor = await prisma.professor.findUnique({
      where: { 
        id: professorId,
        userId: dbUser.id
      }
    });
    
    if (!professor) {
      return NextResponse.json({ error: "Professor not found or unauthorized" }, { status: 404 });
    }
    
    return NextResponse.json({ professor });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch professor" }, { status: 500 });
  }
}
