import { PrismaClient } from "@prisma/client";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const prisma = new PrismaClient();

interface info {
  apiKey: string;
}

export const isApiKeyExist = async (c: Context) => {
  try {
    const { apiKey } = await c.req.json<info>();

    if (!apiKey) {
      throw new HTTPException(400, { message: "Api Key is required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        apiKey,
      },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    if (!user.isApiKeySet) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isApiKeySet: true,
        },
      });
    }

    return c.json(user.isApiKeySet);
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error occurred while logging in",
    });
  }
};

export const clearApiKey = async (c: Context) => {
  try {
    const { apiKey } = await c.req.json<info>();

    if (!apiKey) {
      throw new HTTPException(400, { message: "Api Key is required" });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isApiKeySet: false,
      },
    });

    return c.json(!!user);
  } catch (error: any) {
    throw new HTTPException(500, {
      message: error.message || "An error occurred while logging in",
    });
  }
};
