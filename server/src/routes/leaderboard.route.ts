import { Hono } from 'hono';
import { hello, updateLeaderboard } from '../controllers/leaderboard.controller.js';

const leaderboardRoute = new Hono();

leaderboardRoute.get('/data', hello);
leaderboardRoute.post('/update', updateLeaderboard);

export default leaderboardRoute;