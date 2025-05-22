// src/app/utils/authOptions.ts
import type { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";

interface stu {
  session: Session;
  token: JWT;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "consent" },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.githubUsername = (profile as any).login;
      }
      return token;
    },
    async session({ session, token }: stu) {
      if (session.user) {
        (session.user as any).githubUsername = token.githubUsername;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
