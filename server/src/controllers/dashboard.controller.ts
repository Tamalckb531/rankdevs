import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

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