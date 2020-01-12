import { initializeDB } from '.';
import logger from '../logger';
import { UserEntity } from './entities/User';

// process.env.DATABASE_URL = 'postgresql://aenaeri-app:password123@localhost:5432/aenaeri-app';

const createUser = async () => {
    logger.info('Connecting to database');
    initializeDB().then(async () => {
        try {
            const user = UserEntity.create({ username: process.env.USERNAME, password: process.env.PASSWORD });
            await user.save();
            logger.info('created user');
            process.exit(0);
        } catch (err) {
            logger.error('could not create user', err);
            process.exit(1);
        }
    }).catch((err) => {
        logger.error('Could not connect to DB');
    });
};

createUser();
