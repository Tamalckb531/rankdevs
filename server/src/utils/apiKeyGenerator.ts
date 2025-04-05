import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateUniqueApiKey = async (): Promise<string> => {
  let apiKey: string = "";
  let exists: boolean = true;

  while (exists) {
    apiKey = crypto.randomBytes(8).toString("hex");
    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    exists = !!user;
  }
  return apiKey;
};
