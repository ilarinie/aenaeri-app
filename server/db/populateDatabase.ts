import dotenv from 'dotenv';
dotenv.config();
import { initializeDB } from '.';

import { populateDatabase } from './populator';
process.env.NODE_ENV = 'production';

const populate = () => {
    initializeDB().then(() => {
        populateDatabase();
    });
};

export default populate;
