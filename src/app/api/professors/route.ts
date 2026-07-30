import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    console.log("===== PROFESSORS AUTH DEBUG =====");
    console.log("Session exists:", !!session);
    console.log("session.user:", session?.user);
    console.log("session.user.id:", session?.user?.id);
    console.log("session.user.email:", session?.user?.email);

    if (!session?.user?.email) {
      console.log("Condition !session?.user?.email evaluated to TRUE. Returning 401.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const professors = await prisma.professor.findMany({
      where: { userId: dbUser.id },
      orderBy: { updatedAt: "desc" },
    });
    
    return NextResponse.json({ professors });
  } catch (error) {
    console.error("Failed to fetch professors:", error);
    return NextResponse.json({ error: "Failed to fetch professors" }, { status: 500 });
  }
}
