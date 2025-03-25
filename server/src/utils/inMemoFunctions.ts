import type { Stats } from "./types.js";

export const updateStats = (stats: Stats, typingTime: number, language: string) => {

    const now = Date.now();

    //? Simple incrementing the total and language time
    stats.total += typingTime;
    stats[language] = (stats[language] || 0) + typingTime;

    //? adding a log to keep track of sliding time
    stats.logs.push({ typingTime, language, timestamp: now });
}

export const initializeStats = (): Stats => ({
    total: 0,
    logs:[]
})

export const cleanOldStats = (stats: Stats, windowInMillis: number) => {
    const cutoffTime = Date.now() - windowInMillis;

    //? Keep only logs from within the sliding window (last 24 hours, 7 days, or 30 days)
    stats.logs = stats.logs.filter(log => log.timestamp > cutoffTime);

    //? language and totalTime recalculation
    stats.total = 0;
    for (const key in stats) {
        if (key !== 'total' && key !== 'logs') {
            stats[key] = 0;
        }
    }

    stats.logs.forEach(log => {
        stats.total += log.typingTime;
        stats[log.language] = (stats[log.language] || 0) + log.typingTime;
    });
}