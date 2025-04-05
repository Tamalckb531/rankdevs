import { Hono } from "hono";
import { github } from "../controllers/auth.controller.js";

const authRoute = new Hono();

authRoute.post("/github", github);

export default authRoute;
