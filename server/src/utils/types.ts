
export type SnapShot = {
    apiKey: string,
    timestamp: number,
    dailyStats:Stats,
    weeklyStats:Stats,
    monthlyStats:Stats,
}

export type Stats = {
    total: number;
    [key: string]: number;
}

export type statPayload = {
    id: string;
    githubUserName: string;
    twitterUsername: string | null;
    Stats: Stats;
}