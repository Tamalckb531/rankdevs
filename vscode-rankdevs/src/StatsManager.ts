import { sendTodayDataToBackend } from './apiService';
import { isPrevDay } from './utils/func';
import {Stats, todaysStats} from './utils/types'
import * as vscode from 'vscode';

export class StatsManager{
    private static instance: StatsManager;

    private daily: Stats = {total:0, logs:[]};
    private weekly: Stats = {total:0, logs:[]};
    private monthly: Stats = { total: 0, logs: [] };

    private today: todaysStats = { total: 0, lastTime:Date.now() };
    
    private ONE_DAY: number = 24 * 60 * 60 * 1000;
    private ONE_WEEK: number = 7 * this.ONE_DAY;
    private ONE_MONTH = 30 * this.ONE_DAY;
    
    private constructor(context: vscode.ExtensionContext) { 
        this.daily = context.globalState.get<Stats>('dailyStats') || { total: 0, logs: [] };
        this.weekly = context.globalState.get<Stats>('weeklyStats') || { total: 0, logs: [] };
        this.monthly = context.globalState.get<Stats>('monthlyStats') || { total: 0, logs: [] };

        this.today = context.globalState.get<todaysStats>('todaysStats') || { total: 0, lastTime:Date.now() };
    }

    private updateStats(stats: Stats, typingTime: number, language: string):void {
        //? FLOW : increment in total and key -> save the log
        const now = Date.now();

        stats.total += typingTime;
        stats[language] = (stats[language] || 0) + typingTime;

        stats.logs.push({ typingTime, language, timestamp: now });
    }

    private updateTodayStats(typingTime: number, language: string, apiKey: string): void{
        const now = Date.now();

        if (isPrevDay(now, this.today.lastTime)) {
            //? processing of database and reset time
            sendTodayDataToBackend(apiKey, this.today);
            this.resetTodayStats();
        }

        this.today.total += typingTime;
        this.today[language] = (this.today[language] || 0) + typingTime;
        this.today.lastTime = now;
    }

    private resetTodayStats(): void{
        this.today = {
            total: 0,
            lastTime: Date.now()
        }
    }

    private cleanOldStats(stats: Stats, lastLimitFinder: number) {
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

    public static getInstance(context:vscode.ExtensionContext): StatsManager{
        if (!StatsManager.instance) {
            StatsManager.instance = new StatsManager(context);
        }
        return StatsManager.instance;
    }

    public addTypingData(language: string, typingTime: number, apiKey:string): void {
        this.updateStats(this.daily, typingTime, language);
        this.updateStats(this.weekly, typingTime, language);
        this.updateStats(this.monthly, typingTime, language);

        this.updateTodayStats(typingTime, language, apiKey);
    }

    public intervalWiseCleanUp(): void {
        try {
            this.cleanOldStats(this.daily, this.ONE_DAY);
            this.cleanOldStats(this.weekly, this.ONE_WEEK);
            this.cleanOldStats(this.monthly, this.ONE_MONTH);
        } catch (error: any) {
            console.error("Error happened inside intervalWiseCleanUp : ", error);
        }
    }
    
    public cleanup(context: vscode.ExtensionContext): void {
        context.globalState.update('dailyStats', this.daily);
        context.globalState.update('weeklyStats', this.weekly);
        context.globalState.update('monthlyStats', this.monthly);

        context.globalState.update('todaysStats', this.today);
    }
    
}