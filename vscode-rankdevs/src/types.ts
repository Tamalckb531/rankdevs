export type Log = {
    typingTime: number,
    language: string,
    timestamp:number,
}

export type Stats = {
    total: number;
    [key: string]: number | any;
    logs: Log[];
}