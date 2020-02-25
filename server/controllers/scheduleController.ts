import { NextFunction, Request, Response } from 'express';
import { todaysGames } from '../db/queries/nextGames';
import logger from '../logger';

export const handleCurrentDayScheduleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await todaysGames());
    } catch (err) {
        logger.error(err);
        res.status(500).send('uh oh');
    }
};
