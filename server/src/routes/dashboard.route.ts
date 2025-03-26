import { Hono } from 'hono';
import verifyToken from '../utils/verifyToken.js';
import { getDashboard } from '../controllers/dashboard.controller.js';

const dashboardRoute = new Hono();

dashboardRoute.get('/data', verifyToken, getDashboard);

export default dashboardRoute;