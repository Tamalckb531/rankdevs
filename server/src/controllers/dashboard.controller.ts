import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from '@prisma/client'
import type { updatePayload } from "../utils/types.js";

const prisma = new PrismaClient();

export const updateDashboard = async (c: Context) => {
    const { apiKey, data }: updatePayload = await c.req.json();

    if (!apiKey || !data) return c.json({ status: 401, msg: 'API key missing or data is not sufficient' });
    
    try {
        const user = await prisma.user.findUnique({
            where: { apiKey }
        });

        if (!user) return c.json({ status: 404, message: "User not found, change your apiKey" });
        
        const today = new Date(data.lastTime);
        const day = today.getDay(); //? 0-> Sunday, 1=Monday
        const date = today.getDate(); //? 1-31
        const month = today.getMonth(); //? 0->January etc
        const year = today.getFullYear();

        const weeklyStats = user.weeklyStats as any;
        const monthlyStats = user.monthlyStats as any;
        const yearlyStats = user.yearlyStats as any;

        //? Reset weekly stats every single monday
        
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