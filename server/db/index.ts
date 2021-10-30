import env from 'env-var';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import logger from '../logger';

// mongoose.connect(process.env.MONGO_URI as string);

const fileExtension = (): string => {
    if (env.get('NODE_ENV').asString() === 'production') {
        return '.js';
    }
    return '.ts';
};

const sourceDir = (): string => {
    if (env.get('NODE_ENV').asString() === 'production') {
        return 'dist';
    }
    return 'server';
};

const options = () => {
    return {
        entities: [`${sourceDir()}/db/entities/**/*${fileExtension()}`],
        migrations: [`${sourceDir()}/db/migrations/**/*${fileExtension()}`],
        subscribers: [`${sourceDir()}/db/subscribers/**/*${fileExtension()}`],
        cli: {
            entitiesDir: `${sourceDir()}/db/entities`,
            migrationsDir: `${sourceDir()}/db/migrations`,
            subscribersDir: `${sourceDir()}/db/subscribers`,
        },
    };
};

const initializeDB = async () => {
    console.log('fib')
    try {
        console.log('fl😋')
        console.log(options());
        console.log('🧖')

        await createConnection({
            type: 'postgres' as 'postgres',
            url: env.get('DATABASE_URL').asString() || '',
            synchronize: true,
            logging: false,
            ...options(),
        });
        console.log('flab')
        logger.info('Database connection initialized.');
    } catch (err) {
        logger.error(`Could not create a database connection: ${err}`);
        throw err
    }
};

export { initializeDB };
