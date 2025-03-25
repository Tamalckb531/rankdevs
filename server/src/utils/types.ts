
export type Payload = {
    apiKey: string,
    typingTime: number,
    language: string,
    timestamp:number,
}

interface Log{
    typingTime: number;
    language: string;
    timestamp: number
}

export type Stats = {
    total: number;
    [key: string]: number | any;
    logs: Log[];
}