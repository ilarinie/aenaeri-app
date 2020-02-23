import { NextFunction, Request, Response } from 'express';
import ExtendedBoxScoreSchema from '../db/mongo/ExtendedBoxScoreSchema';
import logger from '../logger';
import { VeikkausService } from '../services/VeikkausService/VeikkausService';
import { PinnacleService } from '../services/PinnacleService/PinnacleService';
import { UserEntity } from '../db/entities/User';

export const handleCurrentDayScheduleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ExtendedBoxScoreSchema.find({ 'gameData.status.abstractGameState': 'Preview', 'gameData.datetime.dateTime': { $gt: new Date(new Date().getTime() - 1000 * 60 * 60 *  3), $lt: new Date(new Date().getTime() + 1000  * 60 * 60 * 24 ) }}).sort({ gamePk: 1}).limit(8)
        console.log(response.length)
        const responseWithOdds = await VeikkausService.getInstance().getVeikkausOdds(response);
        const pinnacleRes = await PinnacleService.getInstance().getOddsForGames(response, req.user as UserEntity);

        res.send(responseWithOdds);
    } catch (err) {
        logger.error(err);
        res.status(500).send('uh oh')
    }
};
