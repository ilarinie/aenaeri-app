import { NextFunction, Request, Response } from 'express';
import { PlayerEntity } from '../db/entities/Player';
import { getPlayerGameStats } from '../db/queries/playerGameData';

export const playerGameByGameStats = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id) {
        const player = await PlayerEntity.findOneOrFail(req.params.id);
        if (player) {
            const stats = await getPlayerGameStats(player.id.toString(), req.params.season ? req.params.season : '20212022', player.position === 'Goalie');
            const statsLastSeason = await getPlayerGameStats(player.id.toString(), req.params.season ? req.params.season : '20182019', player.position === 'Goalie');
            res.send({20182019: statsLastSeason, 20212022: stats});
        } else {
            next('Player not found');
        }
    } else {
        next('PlayerId missing');
    }
};
