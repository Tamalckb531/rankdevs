
export type Payload = {
    apiKey: string,
    typingTime: number,
    language: string,
    timestamp:number,
}

type Log = Omit<Payload,'apiKey'>;

export type Stats = {
    total: number;
    [key: string]: number | any;
    logs: Log[];
}

type tableStats = {
    total: number;
    [key: string]: number;
}

export type statPayload = {
    id: string;
    githubUserName: string;
    twitterUsername: string | null;
    Stats: tableStats;
}