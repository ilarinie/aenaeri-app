import { Application } from 'express';
import { TEST_ROUTE } from '../config';
import controllers from '../controllers';

export const initializeRoutes = (app: Application) => {
  app.get(TEST_ROUTE, controllers.testController.handleTestRoute);
  app.get('/api/basedata', controllers.baseController.handleBaseRoute);
  app.get('/api/basedataupdated', controllers.baseController.handleRefreshCheckRoute);
};
