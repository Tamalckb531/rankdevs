import * as dotenv from "dotenv";
import * as path from "path";
import * as vscode from "vscode";

import { Stats, refinedStats, Payload, todaysStats } from "./utils/types";

dotenv.config({ path: path.join(__dirname, "../.env") });

interface Info {
  status: number;
  msg: "nokey" | "check";
  value: boolean;
}

const extractStats = (stat: Stats): refinedStats => {
  const { logs, ...otherProps } = stat;
  return otherProps;
};

export const sendDataToBackend = async (
  apiKey: string,
  context: vscode.ExtensionContext
) => {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl || !apiKey) {
    vscode.window.showInformationMessage("ApiKey not found!");
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

  const todayData: todaysStats = context.globalState.get<todaysStats>(
    "todaysStats"
  ) || {
    total: 0,
    lastTime: Date.now(),
  };

  if (
    dailyStats.total === 0 &&
    weeklyStats.total === 0 &&
    monthlyStats.total === 0 &&
    todayData.total === 0
  )
    return;

  const dailyRefinedStats: refinedStats = extractStats(dailyStats);
  const weeklyRefinedStats: refinedStats = extractStats(weeklyStats);
  const monthlyRefinedStats: refinedStats = extractStats(monthlyStats);

  const payload: Payload = {
    apiKey,
    timestamp: Date.now(),
    data: todayData,
    dailyStats: dailyRefinedStats,
    weeklyStats: weeklyRefinedStats,
    monthlyStats: monthlyRefinedStats,
  };

  try {
    await fetch(`${backendUrl}/api/leaderboard/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Error sending typing data:", error);
  }
};

export const checkApiKeyExist = async (apiKey: string): Promise<boolean> => {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl || !apiKey) {
    vscode.window.showInformationMessage("Api Key not found");
    return false;
  }

  try {
    const res = await fetch(`${backendUrl}/api/key/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!res.ok) {
      const err: any = await res.json();
      throw new Error(err.message);
    }

    const data = (await res.json()) as Info;
    if (data.msg === "nokey") {
      vscode.window.showInformationMessage("No such key found");
    } else if (!data.value && data.msg === "check") {
      vscode.window.showInformationMessage("Api Key already set");
    }
    return data.value;
  } catch (error: any) {
    vscode.window.showInformationMessage(
      "Some error occurred : ",
      error.message
    );
    return false;
  }
};

export const clearApiKeyBE = async (apiKey: string): Promise<boolean> => {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl || !apiKey) {
    vscode.window.showInformationMessage("Api Key not found");
    return false;
  }

  try {
    const res = await fetch(`${backendUrl}/api/key/clear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!res.ok) {
      const err: any = await res.json();
      throw new Error(err.message);
    }

    const data = (await res.json()) as Info;
    if (data.msg === "nokey") {
      vscode.window.showInformationMessage("No such key found to clear");
    } else if (data.value && data.msg === "check") {
      vscode.window.showInformationMessage("Api Key cleared successfully");
    }
    return data.value;
  } catch (error: any) {
    vscode.window.showInformationMessage(
      "Some error occurred : ",
      error.message
    );
    return false;
  }
};
