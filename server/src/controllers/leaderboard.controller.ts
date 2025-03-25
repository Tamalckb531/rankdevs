import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from '@prisma/client'
import { inMemoryStats } from "../utils/inMemoryStats.js";
import { updateStats } from "../utils/inMemoFunctions.js";
import type { Payload } from "../utils/types.js";

const prisma = new PrismaClient();

export const hello = async (c:Context) => {
    return c.text("Hello from leaderboard");
}

export const updateLeaderboard = async (c: Context) => {
    const payload = await c.req.json<Payload>();

    try {
        //? Find the user by apiKey
        const user = await prisma.user.findUnique({
            where: { apiKey: payload.apiKey }
        });

        if (!user) return c.json({ status: 404, msg: 'User not found' });
        const userId = user.id;

        //? no user entry -> create entry
        if (!inMemoryStats[userId]) {
            inMemoryStats[userId] = {
                dailyStats: {total:0},
                weeklyStats: {total:0},
                monthlyStats: {total:0},
            }
        }

        //? update times in memory
        const { dailyStats, weeklyStats, monthlyStats } = inMemoryStats[userId];
        updateStats(dailyStats, payload.typingTime, payload.language);
        updateStats(weeklyStats, payload.typingTime, payload.language);
        updateStats(monthlyStats, payload.typingTime, payload.language);

        return c.json({ status: 200, msg: "stats updated" });
        
    } catch (error: any) {
        throw new HTTPException(500, { message: error.message || 'An error from leader board update' });
    }

}