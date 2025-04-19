import { sendTodayDataToBackend } from "./apiService";
import { isPrevDay } from "./utils/func";
import { Stats, todaysStats } from "./utils/types";
import * as vscode from "vscode";

export class StatsManager {
  private static instance: StatsManager;
  private context: vscode.ExtensionContext;

  private daily: Stats = { total: 0, logs: [] };
  private weekly: Stats = { total: 0, logs: [] };
  private monthly: Stats = { total: 0, logs: [] };

  private today: todaysStats = { total: 0, lastTime: Date.now() };

  private ONE_DAY: number = 24 * 60 * 60 * 1000;
  private ONE_WEEK: number = 7 * this.ONE_DAY;
  private ONE_MONTH: number = 30 * this.ONE_DAY;

  private typeDaily: string = "daily";
  private typeWeekly: string = "weekly";
  private typeMonthly: string = "monthly";

  private constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public async init(): Promise<void> {
    this.daily = this.context.globalState.get<Stats>("dailyStats") || {
      total: 0,
      logs: [],
    };
    this.weekly = this.context.globalState.get<Stats>("weeklyStats") || {
      total: 0,
      logs: [],
    };
    this.monthly = this.context.globalState.get<Stats>("monthlyStats") || {
      total: 0,
      logs: [],
    };
    this.today = this.context.globalState.get<todaysStats>("todaysStats") || {
      total: 0,
      lastTime: Date.now(),
    };
  }

  private updateStats(
    stats: Stats,
    typingTime: number,
    language: string,
    type: string
  ): void {
    //? FLOW : increment in total and key -> save the log
    const now = Date.now();

    stats.total += typingTime;
    stats[language] = (stats[language] || 0) + typingTime;

    stats.logs.push({ typingTime, language, timestamp: now });

    this.saveToContext(stats, type);
  }

  private saveToContext(stats: Stats, type: string): void {
    switch (type) {
      case this.typeDaily:
        this.context.globalState.update("dailyStats", stats);
        break;
      case this.typeWeekly:
        this.context.globalState.update("weeklyStats", stats);
        break;
      case this.typeMonthly:
        this.context.globalState.update("monthlyStats", stats);
        break;
      default:
        console.log("Invalid object");
        break;
    }

    console.log(
      "Save to context run successfully! Here's a demo for daily : ",
      this.context.globalState.get("dailyStats")
    );
  }

  private updateTodayStats(
    typingTime: number,
    language: string,
    apiKey: string
  ): void {
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

  private resetTodayStats(): void {
    this.today = {
      total: 0,
      lastTime: Date.now(),
    };
  }

  private cleanOldStats(stats: Stats, lastLimitFinder: number, type: string) {
    //? FLOW : filter old time -> clean total and keys time -> re add total and key time from filtered log

    //? This gives time of 24 hours, 7 dyas or 30 days ago
    const lastLimit = Date.now() - lastLimitFinder;

    const outdatedLogs = stats.logs.filter((log) => log.timestamp < lastLimit);

    outdatedLogs.forEach((log) => {
      stats.total -= log.typingTime;
      stats[log.language] -= log.typingTime;

      if (stats[log.language] <= 0) delete stats[log.language];
    });

    stats.logs = stats.logs.filter((log) => log.timestamp > lastLimit);

    this.saveToContext(stats, type);
  }

  public static getInstance(context: vscode.ExtensionContext): StatsManager {
    if (!StatsManager.instance) {
      StatsManager.instance = new StatsManager(context);
    }
    return StatsManager.instance;
  }

  public addTypingData(
    language: string,
    typingTime: number,
    apiKey: string
  ): void {
    this.updateStats(this.daily, typingTime, language, this.typeDaily);
    this.updateStats(this.weekly, typingTime, language, this.typeWeekly);
    this.updateStats(this.monthly, typingTime, language, this.typeMonthly);

    this.updateTodayStats(typingTime, language, apiKey);
  }

  public intervalWiseCleanUp(): void {
    try {
      this.cleanOldStats(this.daily, this.ONE_DAY, this.typeDaily);
      this.cleanOldStats(this.weekly, this.ONE_WEEK, this.typeWeekly);
      this.cleanOldStats(this.monthly, this.ONE_MONTH, this.typeMonthly);
    } catch (error: any) {
      console.error("Error happened inside intervalWiseCleanUp : ", error);
    }
  }

  public testCleanUp(): void {
    const now = Date.now();

    // Fake Daily Stats (1 log old, 2 logs recent)
    const daily: Stats = {
      total: 18000,
      typescript: 9000,
      javascript: 4000,
      python: 5000,
      logs: [
        {
          typingTime: 5000,
          language: "typescript",
          timestamp: now - 25 * 60 * 60 * 1000,
        }, // 25 hrs ago -> //? should get removed
        {
          typingTime: 4000,
          language: "typescript",
          timestamp: now - 23 * 60 * 60 * 1000,
        }, // 23 hrs ago
        {
          typingTime: 4000,
          language: "javascript",
          timestamp: now - 2 * 60 * 60 * 1000,
        }, // 2 hrs ago
        {
          typingTime: 3000,
          language: "python",
          timestamp: now - 1 * 60 * 60 * 1000,
        }, // 1 hr ago
        {
          typingTime: 2000,
          language: "python",
          timestamp: now - (26 * 60 * 60 * 1000 + 500),
        }, // 24 hr and .05 second ago -> //? should get removed
      ],
    };

    // Fake Weekly Stats (1 log old, 2 recent)
    const weekly: Stats = {
      total: 18000,
      typescript: 6000,
      java: 7000,
      go: 5000,
      logs: [
        {
          typingTime: 6000,
          language: "typescript",
          timestamp: now - 8 * 24 * 60 * 60 * 1000,
        }, // 8 days ago -> //? should get removed
        {
          typingTime: 4000,
          language: "java",
          timestamp: now - 3 * 24 * 60 * 60 * 1000,
        }, // 3 days ago
        {
          typingTime: 3000,
          language: "java",
          timestamp: now - (7 * 24 * 60 * 60 * 1000 + 500),
        }, // 7 days 0.5 s ago -> //? should get removed
        {
          typingTime: 5000,
          language: "go",
          timestamp: now - 1 * 24 * 60 * 60 * 1000,
        }, // 1 day ago
      ],
    };

    // Fake Monthly Stats (1 log old, 2 recent)
    const monthly: Stats = {
      total: 18000,
      cpp: 8000,
      rust: 6000,
      dart: 4000,
      cobol: 4000,
      logs: [
        {
          typingTime: 8000,
          language: "cpp",
          timestamp: now - 35 * 24 * 60 * 60 * 1000,
        }, // 35 days ago -> //? should get removed
        {
          typingTime: 6000,
          language: "rust",
          timestamp: now - 15 * 24 * 60 * 60 * 1000,
        }, // 15 days ago
        {
          typingTime: 4000,
          language: "dart",
          timestamp: now - 5 * 24 * 60 * 60 * 1000,
        }, // 5 days ago
        {
          typingTime: 4000,
          language: "cobol",
          timestamp: now - (30 * 24 * 60 * 60 * 1000 + 500),
        }, // 30 days 0.5 sec ago -> //? should get removed
      ],
    };

    console.log("Before Cleanup:");
    console.log("Daily:", daily);
    console.log("Weekly:", weekly);
    console.log("Monthly:", monthly);

    this.cleanOldStats(daily, this.ONE_DAY, this.typeDaily);
    this.cleanOldStats(weekly, this.ONE_WEEK, this.typeWeekly);
    this.cleanOldStats(monthly, this.ONE_MONTH, this.typeMonthly);

    console.log("After Cleanup:");
    console.log("Daily:", daily);
    console.log("Weekly:", weekly);
    console.log("Monthly:", monthly);
  }

  // public cleanup(): void {
  //   console.log("Clean-up run");

  //   this.context.globalState.update("dailyStats", this.daily);
  //   this.context.globalState.update("weeklyStats", this.weekly);
  //   this.context.globalState.update("monthlyStats", this.monthly);

  //   this.context.globalState.update("todaysStats", this.today);

  //   console.log(
  //     "Today from clean-up: ",
  //     this.context.globalState.get<todaysStats>("todaysStats")
  //   );
  //   console.log(
  //     "Daily from clean-up: ",
  //     this.context.globalState.get<Stats>("dailyStats")
  //   );
  //   console.log(
  //     "Weekly from clean-up: ",
  //     this.context.globalState.get<Stats>("weeklyStats")
  //   );
  //   console.log(
  //     "Monthly from clean-up: ",
  //     this.context.globalState.get<Stats>("monthlyStats")
  //   );
  // }
}
