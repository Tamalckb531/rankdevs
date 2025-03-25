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

//? filter old time -> clean total and keys time -> re add total and key time from filtered log
export const cleanOldStats = (stats: Stats, windowInMillis: number) => {
    //? This gives time of 24 hours, 7 days, or 30 days ago
    const cutoffTime = Date.now() - windowInMillis;

    //* New efficient logic:
    
    //? get all outdated logs
    const outdatedLogs = stats.logs.filter(log => log.timestamp < cutoffTime);

    //? Subtract outdated log time from stats
    outdatedLogs.forEach(log => {
        stats.total -= log.typingTime;
        stats[log.language] -= log.typingTime;

        // language hasn't typed with in cutoff time
        if (stats[log.language] <= 0) delete stats[log.language];
    });

    //? delete out dated logs
    stats.logs = stats.logs.filter(log => log.timestamp > cutoffTime);
}





    //* Prev logic for clean-up:
    // //? Keep only last 24 hours, 7 days, or 30 days logs
    // //? basically if timestamp is bigger than time of 24 hours, 7 days, or 30 days ago -> it will be bigger
    // stats.logs = stats.logs.filter(log => log.timestamp > cutoffTime);

    // //? language and totalTime recalculation
    // stats.total = 0;
    // for (const key in stats) {
    //     if (key !== 'total' && key !== 'logs') {
    //         stats[key] = 0;
    //     }
    // }

    // stats.logs.forEach(log => {
    //     stats.total += log.typingTime;
    //     stats[log.language] = (stats[log.language] || 0) + log.typingTime;
    // });
