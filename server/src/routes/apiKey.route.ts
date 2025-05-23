import { Hono } from "hono";
import {
  clearApiKey,
  isApiKeyExist,
} from "../controllers/apikey.controller.js";

const authRoute = new Hono();

authRoute.post("/check", isApiKeyExist);
authRoute.post("/clear", clearApiKey);

export default authRoute;
