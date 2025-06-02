export type Log = {
  typingTime: number;
  language: string;
  timestamp: number;
};

export type Stats = {
  total: number;
  [key: string]: number | any;
  logs: Log[];
};

export type refinedStats = {
  total: number;
  [key: string]: number | any;
};

export type todaysStats = refinedStats & {
  lastTime: number;
};

export interface Payload {
  apiKey: string;
  timestamp: number;
  timezoneOffset: number;
  data: todaysStats;
  dailyStats: refinedStats;
  weeklyStats: refinedStats;
  monthlyStats: refinedStats;
}
