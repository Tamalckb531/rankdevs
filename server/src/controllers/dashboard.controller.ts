import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getDashboard = (c: Context) => {
    
}