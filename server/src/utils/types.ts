
export type Payload = {
    apiKey: string,
    typingTime: number,
    language: string,
    timestamp:number,
}

export type Stats = {
    total: number;
    [key: string]: number;
}