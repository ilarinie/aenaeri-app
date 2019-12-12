import dotenv from 'dotenv';
import app from './app/app';
import { initializeDB } from './db';
import logger from './logger';
dotenv.config();

const PORT = process.env.PORT || 3001;

initializeDB().then(() => {
    app.listen(PORT, () => {
        logger.info('Aenaeri-app backend started, listening to port 3001');
    });
}).catch((err) => {
    logger.error(`Application startup failed ${err}`);
});
