import {Stats} from './types'
import * as vscode from 'vscode';

export class StatsManager{
    private static instance: StatsManager;
    private daily: Stats = {total:0, logs:[]};
    private weekly: Stats = {total:0, logs:[]};
    private monthly: Stats = {total:0, logs:[]};
    
    private constructor(context:vscode.ExtensionContext) { 
        this.daily = context.globalState.get<Stats>('dailyStats') || { total: 0, logs: [] };
        this.weekly = context.globalState.get<Stats>('weeklyStats') || { total: 0, logs: [] };
        this.monthly = context.globalState.get<Stats>('monthlyStats') || { total: 0, logs: [] };
    }

    private updateStats = (stats: Stats, typingTime: number, language: string):void => {
        //? FLOW : increment in total and key -> save the log
        const now = Date.now();

        stats.total += typingTime;
        stats[language] = (stats[language] || 0) + typingTime;

        stats.logs.push({ typingTime, language, timestamp: now });
    }

    private cleanOldStats = (stats: Stats, lastLimitFinder: number) => {
        //? FLOW : filter old time -> clean total and keys time -> re add total and key time from filtered log

        //? This gives time of 24 hours, 7 dyas or 30 days ago
        const lastLimit = Date.now() - lastLimitFinder; 

        const outdatedLogs = stats.logs.filter(log => log.timestamp < lastLimit);

        outdatedLogs.forEach(log => {
            stats.total -= log.typingTime;
            stats[log.language] -= log.typingTime;

            if (stats[log.language] <= 0) delete stats[log.language];
        });

        stats.logs = stats.logs.filter(log => log.timestamp > lastLimit);
    }

    public static getInstance = (context:vscode.ExtensionContext): StatsManager =>{
        if (!StatsManager.instance) {
            StatsManager.instance = new StatsManager(context);
        }
        return StatsManager.instance;
    }

    public addTypingData = (language: string, typingTime: number): void => {
        this.updateStats(this.daily, typingTime, language);
        this.updateStats(this.weekly, typingTime, language);
        this.updateStats(this.monthly, typingTime, language);
    }
    
    public cleanup = (context: vscode.ExtensionContext): void => {
        context.globalState.update('dailyStats', this.daily);
        context.globalState.update('weeklyStats', this.weekly);
        context.globalState.update('monthlyStats', this.monthly);
    }
    
}