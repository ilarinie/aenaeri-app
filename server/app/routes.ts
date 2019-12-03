import { Application } from 'express';
import { checkAuth } from '../auth/checkAuth';
import { handleLogin } from '../auth/login';
import { handleTestAuth } from '../auth/testAuth';
import { TEST_ROUTE } from '../config';
import controllers from '../controllers';

export const initializeRoutes = (app: Application) => {
  app.get(TEST_ROUTE, controllers.testController.handleTestRoute);
  app.get('/api/basedata', controllers.baseController.handleBaseRoute);
  app.post('/api/basedataupdated', controllers.baseController.handleRefreshCheckRoute);
  app.get('/api/gamestats/:id', controllers.gameStatsController.playerGameByGameStats);
  app.get('/api/schedule', controllers.scheduleController.handleCurrentDayScheduleRoute);
  app.post('/api/login', handleLogin);
  app.get('/api/checklogin', checkAuth,  handleTestAuth);
  app.post('/api/profile/updateveikkaus', checkAuth, controllers.usersController.handleVLoginUpdate)
};
