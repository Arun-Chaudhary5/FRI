import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { google } from "googleapis";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(ip, "email", 10, 60000); // 10 emails/drafts per minute
    if (!rl.success) {
      return NextResponse.json({ error: "Too many drafts created. Please try again later." }, { status: 429 });
    }

    console.log("[Gmail Draft] Request received");
    const session = await getServerSession(authOptions);
    
    console.log(`[Gmail Draft] Session found: ${!!session}`);
    console.log(`[Gmail Draft] Google credentials found: ${!!(session as any)?.accessToken}`);

    if (!session || !(session as any).accessToken) {
      return NextResponse.json({ error: "Unauthorized. Please sign in with Google." }, { status: 401 });
    }

    if ((session as any).error === "RefreshAccessTokenError") {
      console.log(`[Gmail Draft] Access token expired: true`);
      console.log(`[Gmail Draft] Refresh attempted: false (revoked or failed)`);
      return NextResponse.json({ error: "Google session expired. Please sign in again." }, { status: 401 });
    } else {
      console.log(`[Gmail Draft] Access token active or refresh attempted: true`);
    }

    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log(`[Gmail Draft] User resolved: true`);

    const accessToken = (session as any).accessToken;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    // Construct raw RFC 2822 email message
    const message = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      '',
      body
    ].join('\r\n');

    // Encode to base64url format
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log(`[Gmail Draft] Draft creation started`);
    // Create Draft instead of sending directly
    const result = await gmail.users.drafts.create({
      userId: 'me',
      requestBody: {
        message: {
          raw: encodedMessage
        }
      }
    });

    console.log(`[Gmail Draft] Draft creation successful!`);
    return NextResponse.json({ success: true, result: result.data });
  } catch (error: any) {
    console.error("Draft creation error:", error);
    return NextResponse.json({ error: "Failed to save draft: " + error.message }, { status: 500 });
  }
}
