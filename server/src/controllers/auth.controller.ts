import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import jwt from "jsonwebtoken";
import { generateUniqueApiKey } from "../utils/apiKeyGenerator.js";
import {
  initializeMonthlyStats,
  initializeWeeklyStats,
  initializeYearlyStats,
} from "../utils/dashboardTime.js";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY || "";

interface gt {
  githubUserName: string;
}

export const github = async (c: Context) => {
  try {
    const { githubUserName } = await c.req.json<gt>();

    if (!secretKey) {
      throw new Error(
        "JWT_SECRET_KEY is not defined in the environment variables"
      );
    }

    const user = await prisma.user.findUnique({
      where: { githubUserName },
    });

    if (user) {
      const token: string = jwt.sign({ id: user.id }, secretKey);

      setCookie(c, "access_token", token);

      return c.json({
        msg: "Logged in successfully",
        user: user,
      });
    } else {
      const apiKey = await generateUniqueApiKey();
      const today = new Date();

      const newUser = await prisma.user.create({
        data: {
          githubUserName,
          apiKey,
          dailyStats: {},
          weeklyStats: initializeWeeklyStats(),
          monthlyStats: initializeMonthlyStats(
            today.getFullYear(),
            today.getMonth()
          ),
          yearlyStats: initializeYearlyStats(),
          totalStats: {},
          lastStatsTime: "",
        },
      });

      const token: string = jwt.sign({ id: newUser.id }, secretKey);

      setCookie(c, "access_token", token);

      return c.json({
        msg: "Logged in successfully",
        user: user,
      });
    }
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error from leader board update",
    });
  }
};
