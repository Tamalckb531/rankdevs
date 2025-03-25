import dotenv from 'dotenv';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import leaderboardRoute from './routes/leaderboard.route.js'
import { inMemoryStats } from './utils/inMemoryStats.js';
import { cleanOldStats } from './utils/inMemoFunctions.js';

dotenv.config();

const app = new Hono();

// Enable CORS with type safety, allowing credentials
app.use('*', cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));


app.get('/test', (c) => {
  return c.text('Sever is healthy')
})

//? routers 
app.route('/api/leaderboard', leaderboardRoute)

//? Global catch middleware
// Global Error Handler
app.onError((err:any, c) => {
  const statuscode = err.status || 500;
  const message = err.message || 'Internal server error';

  return c.json(
    {
      success: false,
      statuscode,
      message,
    },
    statuscode
  );
});

//? interval wise cleanup 
const ONE_DAY = 24 * 60 * 60 * 1000;   
const ONE_WEEK = 7 * ONE_DAY;          
const ONE_MONTH = 30 * ONE_DAY;     

setInterval(() => {
  for (const userId in inMemoryStats) {
      const { dailyStats, weeklyStats, monthlyStats } = inMemoryStats[userId];

      cleanOldStats(dailyStats, ONE_DAY);      // Clean stats older than 24 hours
      cleanOldStats(weeklyStats, ONE_WEEK);    // Clean stats older than 7 days
      cleanOldStats(monthlyStats, ONE_MONTH);  // Clean stats older than 30 days
  }
  console.log("Old logs cleaned!");
}, 60 * 1000);

//? server
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
