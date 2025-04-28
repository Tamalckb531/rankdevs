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

const backendUrl = process.env.BACKEND_URL;

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }: SignIn) {
      console.log("Github Profile: ", profile);

      const res = await fetch(`${backendUrl}/api/auth/github`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          githubUserName: (profile as { login: string }).login,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        console.log("Error occurred in github controller : ", error);
      }

      const data = await res.json();
      console.log(data.user);

      return true;
    },

    async session({ session, token }: stu) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
