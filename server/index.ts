import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app/app';
import { initializeDB } from './db';
import { UserEntity } from './db/entities/User';
import { todaysGames } from './db/queries/nextGames';
import logger from './logger';
import { OddsServices } from './services/OddsService';

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI || '');

initializeDB().then(() => {
    app.listen(PORT, () => {
        logger.info('Aenaeri-app backend started, listening to port 3001');
    });
    // Start periodically updating odds
    if (process.env.DEV_USER_NAME) {
        setInterval(() => {
            logger.info('Fetching todays games and odds');
            UserEntity.findOneOrFail({ username: process.env.DEV_USER_NAME }).then((user) =>  {
                todaysGames().then((games) => {
                    OddsServices.forEach((service) => {
                        service.addOddsForGames(games, user);
                    });
                });
            });
        }, 1000 * 60 * 10);
        logger.info('Updating todays odds..');
        UserEntity.findOneOrFail({ username: process.env.DEV_USER_NAME }).then((user) =>  {
            todaysGames().then(async (games) => {
                for (const service of OddsServices) {
                    await service.addOddsForGames(games, user);
                }
            });
        });
    }

}).catch((err) => {
    logger.error(`Application startup failed ${err}`);
});
