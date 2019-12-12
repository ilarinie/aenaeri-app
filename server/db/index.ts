import env from 'env-var';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import logger from '../logger';

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
    try {
        await createConnection({
            type: 'postgres' as 'postgres',
            url: env.get('DATABASE_URL').asString() || '',
            synchronize: true,
            logging: false,
            ...options(),
        });
        logger.info('Database connection initialized.');
    } catch (err) {
        logger.error(`Could not create a database connection: ${err}`);
    }
};

export { initializeDB };
