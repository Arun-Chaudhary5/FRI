import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

async function refreshAccessToken(token: any) {
  try {
    const url = "https://oauth2.googleapis.com/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // Google sometimes returns a new refresh token, otherwise fallback to the old one
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, 
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          // Downgraded from gmail.send to gmail.compose for security
          scope: "openid email profile https://www.googleapis.com/auth/gmail.compose",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: {}, // keep existing user data
          create: {
            email: user.email,
            name: user.name || "Unknown",
          }
        });
        // Mutate the user object so the JWT callback has the DB ID
        user.id = dbUser.id;
        return true;
      } catch (err) {
        console.error("Failed to upsert user in signIn callback:", err);
        return false; // Block sign-in if DB is unreachable
      }
    },
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000;
        token.id = user.id; // DB ID injected from signIn callback
      }
      
      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      (session as any).accessToken = token.accessToken;
      (session as any).error = token.error;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === "production" ? undefined : "default_secret_for_dev_mode_only"),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
