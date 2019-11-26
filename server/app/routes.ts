import { Application } from 'express';
import { TEST_ROUTE } from '../config';
import controllers from '../controllers';

export const initializeRoutes = (app: Application) => {
  app.get(TEST_ROUTE, controllers.testController.handleTestRoute);
  app.get('/api/basedata', controllers.baseController.handleBaseRoute);
  app.post('/api/basedataupdated', controllers.baseController.handleRefreshCheckRoute);
  app.get('/api/gamestats/:id', controllers.gameStatsController.playerGameByGameStats);
  app.get('/api/schedule', controllers.scheduleController.handleCurrentDayScheduleRoute);
};
