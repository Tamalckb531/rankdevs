import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from '@prisma/client'
import { inMemoryStats } from "../utils/inMemoryStats.js";

const prisma = new PrismaClient();

export const hello = async (c:Context) => {
    return c.text("Hello from leaderboard");
}

export const updateLeaderboard = async (c: Context) => {
    const payload = await c.req.json<{
        apiKey: string;
        typingTime: number;
        language: string;
        timestamp: number;
    }>();

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

        //? update times in 
        
    } catch (error: any) {
        throw new HTTPException(500, { message: error.message || 'An error from leader board update' });
    }

}