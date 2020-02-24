import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { VeikkausService } from '../services/VeikkausService/VeikkausService';
import { PinnacleService } from '../services/PinnacleService/PinnacleService';
import { UserEntity } from '../db/entities/User';
import { todaysGames } from '../db/queries/nextGames';

export const handleCurrentDayScheduleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await todaysGames();
        const responseWithOdds = await VeikkausService.getInstance().addOddsForGames(response);
        const pinnacleRes = await PinnacleService.getInstance().addOddsForGames(response, req.user as UserEntity);
        res.send(responseWithOdds);
    } catch (err) {
        logger.error(err);
        res.status(500).send('uh oh')
    }
};
