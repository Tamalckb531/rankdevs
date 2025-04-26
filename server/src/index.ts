import dotenv from "dotenv";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import leaderboardRoute from "./routes/leaderboard.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import authRoute from "./routes/auth.route.js";
import type { RankEntry } from "./utils/types.js";
import { leaderboards } from "./utils/inMemoryStats.js";

dotenv.config();

const app = new Hono();

// Enable CORS with type safety, allowing credentials
app.use(
  "*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.get("/test", (c) => {
  return c.text("Sever is healthy");
});

//? routers
app.route("/api/auth", authRoute);
app.route("/api/leaderboard", leaderboardRoute);
app.route("/api/dashboard", dashboardRoute);

//? Interval wise leaderboard cleanup -> remove in active users from leaderboard
let dailyInterval: NodeJS.Timeout | null = null,
  weeklyInterval: NodeJS.Timeout | null = null,
  monthlyInterval: NodeJS.Timeout | null = null;

// if (dailyInterval) clearInterval(dailyInterval);
// if (weeklyInterval) clearInterval(weeklyInterval);
// if (monthlyInterval) clearInterval(monthlyInterval);

dailyInterval = setInterval(() => {}, 1 * 60 * 60 * 1000);
weeklyInterval = setInterval(() => {}, 24 * 60 * 60 * 1000);
monthlyInterval = setInterval(() => {}, 3 * 24 * 60 * 60 * 1000);

//? Global catch middleware
app.onError((err: any, c) => {
  const statuscode = err.status || 500;
  const message = err.message || "Internal server error";

  return c.json(
    {
      success: false,
      statuscode,
      message,
    },
    statuscode
  );
});

//? server
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
