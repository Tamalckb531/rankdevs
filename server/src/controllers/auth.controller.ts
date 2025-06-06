import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
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

    if (!githubUserName) {
      throw new HTTPException(400, { message: "GitHub username is required" });
    }

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

      setCookie(c, "access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
      });

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
          totalStats: { sum: { total: 0 } },
          lastStatsTime: new Date(),
        },
      });

      const token: string = jwt.sign({ id: newUser.id }, secretKey);

      setCookie(c, "access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
      });

      return c.json({
        msg: "Logged in successfully",
        user: newUser,
      });
    }
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error occurred while logging in",
    });
  }
};

export const signout = (c: Context) => {
  try {
    deleteCookie(c, "access_token");
    return c.json({
      status: 200,
      msg: "Logged out successfully",
    });
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error occurred while logging out",
    });
  }
};
