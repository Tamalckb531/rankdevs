import type { Context } from "hono";

export const hello = async (c:Context) => {
    return c.text("Hello from leaderboard");
}