import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from '@prisma/client'
import type { updatePayload } from "../utils/types.js";
import { initializeMonthlyStats, initializeStats, initializeWeeklyStats, initializeYearlyStats, isNewWeek, sumStats } from "../utils/dashboardTime.js";

const prisma = new PrismaClient();

export const updateDashboard = async (c: Context) => {
    const { apiKey, data }: updatePayload = await c.req.json();

    if (!apiKey || !data) return c.json({ status: 401, msg: 'API key missing or data is not sufficient' });
    
    try {
        const user = await prisma.user.findUnique({
            where: { apiKey }
        });

        if (!user) return c.json({ status: 404, message: "User not found, change your apiKey" });
        
        const { total, lastTime, ...langStats } = data;
        //? for date calculation
        const prevDate = user.lastStatsTime ? new Date(user.lastStatsTime) : null;
        const today = new Date(lastTime);
        //? later used in prevDate
        const lastStatsTime = today.toISOString();

        let { weeklyStats, monthlyStats, yearlyStats, totalStats } = user;
        
        //? Ensure all stats exist or initialize them if empty
        if (!weeklyStats || !monthlyStats || !yearlyStats || !totalStats) {
            ({ weeklyStats, monthlyStats, yearlyStats, totalStats } = initializeStats(today.getFullYear(), today.getMonth()));
        }

        // Convert Date to useful formats
        const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
        const dayOfMonth = today.getDate();
        const monthName = today.toLocaleString("en-US", { month: "short" });
        const yearName = today.getFullYear();

        let weekChanged = false, monthChanged = false, yearChanged = false;

        if (prevDate) {
            weekChanged = isNewWeek(prevDate, today);
            monthChanged = prevDate.getMonth() !== today.getMonth();
            yearChanged = prevDate.getFullYear() != today.getFullYear();
        }

        if (weekChanged) weeklyStats = initializeWeeklyStats();
        if (monthChanged) monthlyStats = initializeMonthlyStats(today.getFullYear(), today.getMonth());
        if (yearChanged) yearlyStats = initializeYearlyStats();

        //? Update Stats 
        // @ts-ignore
        weeklyStats[dayOfWeek] = { total, ...otherStats };
        // @ts-ignore
        monthlyStats[dayOfMonth] = { total, ...langStats };
        // @ts-ignore
        yearlyStats[monthName] = { total, ...langStats };
        // @ts-ignore
        totalStats[yearName] = { total, ...langStats };

        //? Update sum fields
        // @ts-ignore
        weeklyStats.sum = sumStats(weeklyStats.sum, data);
        // @ts-ignore
        monthlyStats.sum = sumStats(monthlyStats.sum, data);
        // @ts-ignore
        yearlyStats.sum = sumStats(yearlyStats.sum, data);
        // @ts-ignore
        totalStats.sum = sumStats(totalStats.sum, data);

        //? Save updated stats
        await prisma.user.update({
            where: { apiKey },
            data: {
                dailyStats: JSON.stringify({ total: 0, logs: [] }), // Reset daily
                weeklyStats: JSON.stringify(weeklyStats),
                monthlyStats: JSON.stringify(monthlyStats),
                yearlyStats: JSON.stringify(yearlyStats),
                totalStats: JSON.stringify(totalStats),
                lastStatsTime, // Update last recorded time
                updatedAt: new Date(),
            },
        });

        return c.json({ message: "Stats updated successfully." });
    } catch (error: any) {
        throw new HTTPException(500, { message: error.message || "An error from dashboard -> updateDashboard controller " });
    }
}

export const getDashboard = async (c: Context) => {
    const userId = c.get('user')?.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if(!user) throw new HTTPException(404, { message:"User not found" });

        return c.json(user);
    } catch (error: any) {
        throw new HTTPException(500, { message: error.message || "An error from dashboard -> getDashboard controller " });
    }
}