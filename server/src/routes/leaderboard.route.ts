import { Hono } from 'hono';
import { hello, updateLeaderboard } from '../controllers/leaderboard.controller.js';

const leaderboardRoute = new Hono();

leaderboardRoute.get('/daily', hello);
leaderboardRoute.get('/weekly', hello);
leaderboardRoute.get('/monthly', hello);
leaderboardRoute.post('/update', updateLeaderboard);

export default leaderboardRoute;