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
