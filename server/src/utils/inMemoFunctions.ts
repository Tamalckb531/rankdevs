import type { Stats } from "./types.js";

const updateStats = (stats:Stats, typingTime: number, language:string) => {
    stats.total += typingTime;
    stats[language] = (stats[language] || 0) + typingTime;
}