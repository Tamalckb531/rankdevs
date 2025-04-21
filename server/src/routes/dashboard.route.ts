import { Hono } from "hono";
import verifyToken from "../utils/verifyToken.js";
import {
  getDashboard,
  updateDashboard,
} from "../controllers/dashboard.controller.js";

const dashboardRoute = new Hono();

dashboardRoute.get("/data", verifyToken, getDashboard);
dashboardRoute.get("/update", updateDashboard);

export default dashboardRoute;
