import { initializeDB } from '.';

import { populateDatabase } from './populator';

// process.env.DATABASE_URL = 'postgresql://aenaeri-app:password123@localhost:5432/aenaeri-app';

initializeDB().then(() => {
    populateDatabase();
});
