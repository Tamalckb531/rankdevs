export interface User {
  id: string;
  githubUserName: string;
  apiKey: string;
  portfolio: string | null;
  email: string | null;
  twitterUsername: string | null;
  peerlistLink: string | null;
  leetcodeLink: string | null;
  codeforcesLink: string | null;
  linkedIn: string | null;
}

export type TabType = "daily" | "weekly" | "monthly";
