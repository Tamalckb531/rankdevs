export type SnapShot = {
  apiKey: string;
  timestamp: number;
  data: Stats & { lastTime: string };
  dailyStats: Stats;
  weeklyStats: Stats;
  monthlyStats: Stats;
};

export type Stats = {
  total: number;
  [key: string]: number;
};

export type users = {
  id: string;
  githubUserName: string;
  twitterUsername: string | null;
};

export type WeeklyStats = {
  sum: {
    total: number;
    [key: string]: number;
  };
  [day: string]: {
    total: number;
    [key: string]: number;
  };
};
export type MonthlyStats = {
  sum: {
    total: number;
    [key: string]: number;
  };
  [day: number]: {
    total: number;
    [key: string]: number;
  };
};
export type YearlyStats = {
  sum: {
    total: number;
    [key: string]: number;
  };
  [month: string]: {
    total: number;
    [key: string]: number;
  };
};
export type TotalStats = {
  sum: {
    total: number;
    [key: string]: number;
  };
  [year: number]: {
    total: number;
    [key: string]: number;
  };
};

export type allStats = {
  weeklyStats: WeeklyStats;
  monthlyStats: MonthlyStats;
  yearlyStats: YearlyStats;
  totalStats: TotalStats;
};

type todayDataStats = {
  total: number;
  lastTime: number;
  [key: string]: number;
};

export type updatePayload = {
  apiKey: string;
  data: todayDataStats;
};

export type statPayload = {
  id: string;
  githubUserName: string;
  twitterUsername: string | null;
  Stats: Stats;
};

export type RankEntry = { userId: string; total: number };

export type InfoPayload = {
  firstname: string;
  lastname: string;
  isHireable: boolean;
  imgLink: string | null;
  bio: string;
  location: string;
  portfolio: string | null;
  email: string | null;
  twitterUsername: string | null;
  peerlistLink: string | null;
  leetcodeLink: string | null;
  codeforcesLink: string | null;
  linkedIn: string | null;
};

export type DashBoardPayload = {
  id: string;
  firstname: string | null;
  lastname: string | null;
  isHireable: boolean | null;
  imgLink: string | null;
  bio: string | null;
  location: string | null;
  githubUserName: string;
  email: string | null;
  portfolio: string | null;
  twitterUsername: string | null;
  linkedIn: string | null;
  peerlistLink: string | null;
  leetcodeLink: string | null;
  codeforcesLink: string | null;
  latestTime: number | null;
  dailyTotal: number;
  weeklyTotal: number;
  monthlyTotal: number;
  dailyRank: number;
  weeklyRank: number;
  monthlyRank: number;
  weeklyStats: WeeklyStats;
  monthlyStats: MonthlyStats;
  yearlyStats: YearlyStats;
  totalStats: TotalStats;
  joinAt: Date;
};
