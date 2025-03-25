import { Hono } from 'hono';
import { hello } from '../controllers/leaderboard.controller.js';

const leaderboardRoute = new Hono();

leaderboardRoute.get('/data', hello);
leaderboardRoute.post('/update', hello);

export default leaderboardRoute;