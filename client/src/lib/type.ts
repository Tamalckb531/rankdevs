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

export type Status = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
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

export type DashBoardPayload = {
  id: string;
  githubUserName: string;
  email: string | null;
  portfolio: string | null;
  twitterUsername: string | null;
  linkedIn: string | null;
  peerlistLink: string | null;
  leetcodeLink: string | null;
  codeforcesLink: string | null;
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

export type TotalChartData = {
  languages: string;
  time: number;
  fill: string;
};
export type ChartData = {
  field: string;
  time: number;
};

export type StatMode = "time" | "language" | "stats";

export type TotalStatsPayload = {
  mode: string;
  data: TotalChartData[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

export type StatsPayload = {
  mode: StatMode;
  data: ChartData[];
  isLoading: boolean;
  isError: boolean;
};
