import dotenv from "dotenv";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import leaderboardRoute from "./routes/leaderboard.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import authRoute from "./routes/auth.route.js";
import { removeInactiveUsers } from "./utils/inMemoFunctions.js";

dotenv.config();

const app = new Hono();

//! For Development -> comment it out in Production

// app.use(
//   "*",
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

//! For Production -> comment it out in development
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return ""; // Block requests with no Origin (like Postman, curl)

      if (
        origin === "https://rankdevs.vercel.app" ||
        origin === "http://localhost:3000" ||
        origin.startsWith("vscode-webview://")
      ) {
        return origin;
      }

      return ""; // Block everything else
    },
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

if (dailyInterval) clearInterval(dailyInterval);
if (weeklyInterval) clearInterval(weeklyInterval);
if (monthlyInterval) clearInterval(monthlyInterval);

dailyInterval = setInterval(() => {
  removeInactiveUsers("daily", 6 * 60 * 60 * 1000); //? 6 hours
}, 2 * 60 * 60 * 1000); // every 2 hour
weeklyInterval = setInterval(() => {
  removeInactiveUsers("weekly", 2 * 24 * 60 * 60 * 1000); //? 2 days
}, 24 * 60 * 60 * 1000); // every 1 day
monthlyInterval = setInterval(() => {
  removeInactiveUsers("monthly", 5 * 24 * 60 * 60 * 1000); //? 5 days
}, 3 * 24 * 60 * 60 * 1000); // every 3 days

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
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

//? Check out
