import { Hono } from "hono";
import verifyToken from "../utils/verifyToken.js";
import {
  getDashboard,
  updateInfo,
} from "../controllers/dashboard.controller.js";

const dashboardRoute = new Hono();

dashboardRoute.get("/data/:username", getDashboard);
dashboardRoute.put("/info", verifyToken, updateInfo);

export default dashboardRoute;
