import { Hono } from 'hono';
import { getDaily, getMonthly, getWeekly, updateLeaderboard } from '../controllers/leaderboard.controller.js';

const leaderboardRoute = new Hono();

leaderboardRoute.get('/daily', getDaily);
leaderboardRoute.get('/weekly', getWeekly);
leaderboardRoute.get('/monthly', getMonthly);
leaderboardRoute.post('/update', updateLeaderboard);

export default leaderboardRoute;