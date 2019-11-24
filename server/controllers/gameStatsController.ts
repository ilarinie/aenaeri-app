import { NextFunction, Request, Response } from 'express';
import { PlayerEntity } from '../db/entities/Player';
import { getPlayerGameStats } from '../db/queries/playerGameData';

export const playerGameByGameStats = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id) {
        const player = await PlayerEntity.findOneOrFail(req.params.id);
        let stats;
        if (player) {
            stats = await getPlayerGameStats(player.id.toString(), '20192020', player.position === 'Goalie');
            res.send(stats);
        } else {
            next('Player not found');
        }
    } else {
        next('PlayerId missing');
    }
};