import NextAuth from "next-auth";
import type { AuthOptions, Account, Profile, Session, User } from "next-auth";

import { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";

interface SignIn {
  user: User;
  account: Account | null;
  profile?: Profile;
}

interface stu {
  session: Session;
  token: JWT;
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // Add github username from profile to token (only during login)
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
