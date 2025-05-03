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

export type Stats = {
  total: number;
  [key: string]: number;
};

export type statPayload = {
  id: string;
  githubUserName: string;
  twitterUsername: string | null;
  Stats: Stats;
};
