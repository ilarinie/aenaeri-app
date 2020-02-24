import dotenv from 'dotenv';
dotenv.config();
import mongoose, { mongo } from 'mongoose';
import app from './app/app';
import { initializeDB } from './db';
import logger from './logger';
import { UserEntity } from './db/entities/User';
import { OddsServices } from './services/OddsService';
import { todaysGames } from './db/queries/nextGames';

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
                        service.getOddsForGames(games, user);
                    })
                })
            })
        }, 1000 * 60 * 30);
    }



}).catch((err) => {
    logger.error(`Application startup failed ${err}`);
});
