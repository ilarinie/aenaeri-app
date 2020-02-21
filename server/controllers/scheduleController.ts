import { NextFunction, Request, Response } from 'express';
import ExtendedBoxScoreSchema from '../db/mongo/ExtendedBoxScoreSchema';
import logger from '../logger';
import { VeikkausService } from '../services/VeikkausService/VeikkausService';

export const handleCurrentDayScheduleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await ExtendedBoxScoreSchema.find({ 'gameData.status.abstractGameState': 'Preview', 'gameData.datetime.dateTime': { $gt: new Date(new Date().getTime() - 1000 * 60 * 60 *  3), $lt: new Date(new Date().getTime() + 1000  * 60 * 60 * 24 ) }}).sort({ gamePk: 1})
        const responseWithOdds = await VeikkausService.getVeikkausOdds(response);

        res.send(responseWithOdds);
    } catch (err) {
        logger.error(err);
        res.status(500).send('uh oh')
    }
};
