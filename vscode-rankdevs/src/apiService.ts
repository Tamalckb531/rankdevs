import * as dotenv from "dotenv";
import * as path from "path";
import * as vscode from "vscode";

import { Stats, refinedStats, Payload, todaysStats } from "./utils/types";

dotenv.config({ path: path.join(__dirname, "../.env") });

const extractStats = (stat: Stats): refinedStats => {
  const { log, ...otherProps } = stat;
  return otherProps;
};

export const sendTypingDataToBackend = async (
  apiKey: string,
  context: vscode.ExtensionContext
) => {
  console.log("sendTypingDataToBackend called");

  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl || !apiKey) {
    console.error("Backend URL not found! Please check your .env file.");
    return;
  }

  const dailyStats: Stats = context.globalState.get<Stats>("dailyStats") || {
    total: 0,
    logs: [],
  };
  const weeklyStats: Stats = context.globalState.get<Stats>("weeklyStats") || {
    total: 0,
    logs: [],
  };
  const monthlyStats: Stats = context.globalState.get<Stats>(
    "monthlyStats"
  ) || { total: 0, logs: [] };

  if (
    dailyStats.total === 0 &&
    weeklyStats.total === 0 &&
    monthlyStats.total === 0
  )
    return;

  const dailyRefinedStats: refinedStats = extractStats(dailyStats);
  const weeklyRefinedStats: refinedStats = extractStats(weeklyStats);
  const monthlyRefinedStats: refinedStats = extractStats(monthlyStats);

  console.log("Daily from api: ", dailyRefinedStats);
  console.log("Weekly from api: ", weeklyRefinedStats);
  console.log("Monthly from api: ", monthlyRefinedStats);

  const payload: Payload = {
    apiKey,
    timestamp: Date.now(),
    dailyStats: dailyRefinedStats,
    weeklyStats: weeklyRefinedStats,
    monthlyStats: monthlyRefinedStats,
  };

  //   try {
  //     const response = await fetch(`${backendUrl}/api/leaderboard/update`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       console.log("Typing data sent successfully!");
  //     } else {
  //       console.error("Failed to send data to backend:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error sending typing data:", error);
  //   }
};

export const sendTodayDataToBackend = async (
  apiKey: string,
  data: todaysStats
) => {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl || !apiKey) {
    console.error(
      "Backend URL or apiKey not found! Please check your .env file."
    );
    return;
  }

  const payload: any = {
    apiKey,
    data,
  };

  try {
    const response = await fetch(`${backendUrl}/api/dashboard/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    if (response.ok) {
      console.log("Typing data sent successfully!");
    } else {
      console.error("Failed to send data to backend:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending typing data:", error);
  }
};
