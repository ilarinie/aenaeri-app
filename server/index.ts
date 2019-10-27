import app from './app/app';
import { initializeDB } from './db';
import logger from './logger';

initializeDB().then(() => {
    app.listen(3001, () => {
        logger.info('Application started, listening port 3001');
    });
}).catch((err) => {
    logger.error(`Application startup failed ${err}`);
});

