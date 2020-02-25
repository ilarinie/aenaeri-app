import { NextFunction, Request, Response } from 'express';
import { todaysGames } from '../db/queries/nextGames';
import logger from '../logger';
import { VeikkausService } from '../services/VeikkausService/VeikkausService';
import ExtendedBoxScoreSchema, { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';

export const handleCurrentDayScheduleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await ExtendedBoxScoreSchema.findOne({ gamePk: 2019020969 });
        VeikkausService.getInstance().addOddsForGames([ game as ExtendedBoxScoreSchemaDocumentType ]);
        res.send(await todaysGames());
    } catch (err) {
        logger.error(err);
        res.status(500).send('uh oh');
    }
};
