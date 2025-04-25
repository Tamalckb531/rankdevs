import { Hono } from "hono";
import {
  getDaily,
  getMonthly,
  getToday,
  getWeekly,
  updateLeaderboard,
} from "../controllers/leaderboard.controller.js";

const leaderboardRoute = new Hono();

leaderboardRoute.get("/daily", getDaily);
leaderboardRoute.get("/weekly", getWeekly);
leaderboardRoute.get("/monthly", getMonthly);
leaderboardRoute.get("/today", getToday);
leaderboardRoute.post("/update", updateLeaderboard); //? comes from vscode extension

export default leaderboardRoute;
