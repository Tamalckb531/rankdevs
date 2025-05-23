import { Hono } from "hono";

const authRoute = new Hono();

authRoute.get("/check");
authRoute.post("/clear");

export default authRoute;
