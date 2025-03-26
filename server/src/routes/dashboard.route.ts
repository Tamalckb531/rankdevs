import { Hono } from 'hono';

const dashboardRoute = new Hono();

dashboardRoute.get('/daily');

export default dashboardRoute;