import dotenv from "dotenv";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import leaderboardRoute from "./routes/leaderboard.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import authRoute from "./routes/auth.route.js";
import keyRoute from "./routes/apiKey.route.js";
import { removeInactiveUsers } from "./utils/inMemoFunctions.js";
import { rateLimiter } from "hono-rate-limiter";

dotenv.config();

const app = new Hono();

//! Rate limit

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // per IP
  standardHeaders: "draft-7",
  keyGenerator: (c) => "<unique_key>",
});

app.use(limiter);

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (process.env.NODE_ENV === "development") {
        //? Dev mode : allow localhost, vscode, curl/postman (no origin = curl/postman)
        if (!origin) return process.env.LOCAL_ORIGIN;
        if (
          origin === process.env.LOCAL_ORIGIN ||
          origin.startsWith("vscode-webview://")
        ) {
          return origin;
        }
        return ""; // block others
      }

      //? Production mode: allow only rankdevs and vscode
      const prodAllowed = ["https://www.rankdevs.com"];
      if (!origin) return "https://www.rankdevs.com";
      if (
        origin &&
        (prodAllowed.includes(origin) || origin.startsWith("vscode-webview://"))
      ) {
        return origin;
      }

      return ""; // block everything else
    },
    credentials: true,
  })
);

//! Security helmet :
app.use("*", async (c, next) => {
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("X-XSS-Protection", "1; mode=block");
  return next();
});

app.get("/test", (c) => {
  return c.text("Sever is healthy");
});

//? routers
app.route("/api/auth", authRoute);
app.route("/api/leaderboard", leaderboardRoute);
app.route("/api/dashboard", dashboardRoute);
app.route("/api/key", keyRoute);

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
