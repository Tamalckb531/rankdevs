import type { Stats } from "./types.js";

export const updateStats = (stats: Stats, typingTime: number, language: string) => {

    const now = Date.now();

    //? Simple incrementing the total and language time
    stats.total += typingTime;
    stats[language] = (stats[language] || 0) + typingTime;

    //? adding a log to keep track of sliding time
    stats.logs.push({ typingTime, language, timestamp: now });
}