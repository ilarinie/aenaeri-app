import { initializeDB } from '.';
import logger from '../logger';
import { UserEntity } from './entities/User';

process.env.DATABASE_URL = 'postgresql://aenaeri-app:password123@localhost:5432/aenaeri-app';

const createUser = async () => {
    logger.info('Connecting to database');
    initializeDB().then(async () => {
        try {
            const user = UserEntity.create({ username: 'admin', password: 'password' });
            await user.save();
            logger.info('created user');
        } catch (err) {
            logger.error('could not create user', err);
        }
    }).catch((err) => {
        logger.error('Could not connect to DB');
    });
};

createUser();
