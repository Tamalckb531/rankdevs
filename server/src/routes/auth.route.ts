import { Hono } from "hono";
import { github, signout } from "../controllers/auth.controller.js";

const authRoute = new Hono();

authRoute.post("/github", github);
authRoute.post("/signout", signout);

export default authRoute;
