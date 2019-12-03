import app from './app/app';
import { initializeDB } from './db';
import logger from './logger';
import cron from 'node-cron';
import { populateDatabase } from './db/populator';

initializeDB().then(() => {
    app.listen(3001, () => {
        logger.info('Aenaeri-app backend started, listening to port 3001');
    });
    cron.schedule('* 59 * * *', () => {
        populateDatabase();
    })
}).catch((err) => {
    logger.error(`Application startup failed ${err}`);
});
