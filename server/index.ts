import app from './app/app';
import { initializeDB } from './db';
import logger from './logger';
import cron from 'node-cron';
import { populateDatabase } from './db/populator';

const PORT = process.env.PORT || 3001;

initializeDB().then(() => {
    app.listen(PORT, () => {
        logger.info('Aenaeri-app backend started, listening to port 3001');
    });
    cron.schedule('* 59 * * *', () => {
        populateDatabase();
    })
}).catch((err) => {
    logger.error(`Application startup failed ${err}`);
});
