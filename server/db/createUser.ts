import { initializeDB } from '.';
import logger from '../logger';
import { UserEntity } from './entities/User';

// process.env.DATABASE_URL = 'postgresql://aenaeri-app:password123@localhost:5432/aenaeri-app';

export const createUser = async (username, password) => {
    logger.info(`${username} ${password}`)
    try {
        const user = UserEntity.create({ username, password });
        await user.save();
        logger.info('created user');
        process.exit(0);
    } catch (err) {
        logger.error('could not create user', err);
    }
};

const createUserFromEnv = async () => {
    if (!process.env.NHL_USERNAME || !process.env.PASSWORD) {
        logger.error('Missing NHL_USERNAME or NHL_PASSWORD')
        return
    }
    initializeDB().then(async () => {
        createUser(process.env.NHL_USERNAME, process.env.PASSWORD)
    }).catch((err) => {
        logger.error('Could not connect to DB');
        process.exit(1);
    });
}

//createUserFromEnv();
