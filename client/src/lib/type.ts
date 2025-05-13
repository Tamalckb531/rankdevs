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

export type GenStats = {
  sum: {
    total: number;
    [key: string]: number;
  };
  [field: string | number]: {
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

export type LCPayload = {
  data: LeetCodeData | null;
  isLoading: boolean;
  isError: boolean;
};

export type LeetCodeStats = {
  data: {
    allQuestionsCount: {
      difficulty: "All" | "Easy" | "Medium" | "Hard";
      count: number;
    }[];
    userContestRanking: {
      attendedContestsCount: number;
      rating: number;
      topPercentage: number;
    } | null; // in case user hasn't attended any contest
    matchedUser: {
      contributions: {
        points: number;
      };
      profile: {
        ranking: number;
      };
      submitStatsGlobal: {
        acSubmissionNum: {
          difficulty: "All" | "Easy" | "Medium" | "Hard";
          count: number;
          submissions: number;
        }[];
        totalSubmissionNum: {
          difficulty: "All" | "Easy" | "Medium" | "Hard";
          count: number;
          submissions: number;
        }[];
      };
    };
  };
};

export type Problems = {
  total: number;
  solved: number;
};

export type LeetCodeData = {
  username: string;
  rank: number;
  contributionPoints: number;
  contestAttended: number;
  contestRating: number;
  topPercentage: number;
  acRate: number;
  all: Problems;
  easy: Problems;
  medium: Problems;
  hard: Problems;
};

export type GitHubUserStats = {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
  };
  pullRequests: {
    totalCount: number;
  };
  reposForStarFork: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    nodes: {
      stargazerCount: number;
      forkCount: number;
    }[];
  };
  reposForLang: {
    nodes: {
      languages: {
        edges: {
          size: number;
          node: {
            name: string;
          };
        }[];
      };
    }[];
  };
  latestRepoActivity: {
    nodes: {
      pushedAt: string;
      name: string;
    }[];
  };
  pinnedItems: {
    nodes: {
      name: string;
    }[];
  };
};

export type GithubData = {
  username: string;
  lastActive: string;
  contribution: number;
  repo: number;
  fork: number;
  star: number;
  pr: number;
  language: {
    name: string;
    size: number;
  }[];
  pinnedRepo: {
    name: string;
  }[];
};

export type GHPayload = {
  data: GithubData | null;
  isLoading: boolean;
  isError: boolean;
};
