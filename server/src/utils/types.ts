
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