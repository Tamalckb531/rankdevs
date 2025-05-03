export interface InfoPayload {
  twitterUsername?: string | null;
  peerlistLink?: string | null;
  leetcodeLink?: string | null;
  codeforcesLink?: string | null;
  portfolio?: string | null;
  email?: string | null;
  linkedIn?: string | null;
}

export interface User extends InfoPayload {
  id: string;
  githubUserName: string;
  apiKey: string;
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

export type userInfo = {
  githubUserName: string;
  twitterUsername?: string | null;
};
