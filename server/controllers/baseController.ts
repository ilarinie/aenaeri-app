import { NextFunction, Request, Response } from 'express';
import { GoalieSingleSeasonStatsEntity } from '../db/entities/GoalieSingleSeasonStats';
import { PlayerEntity } from '../db/entities/Player';
import { PlayerDataRefresh } from '../db/entities/PlayerDataRefresh';
import { SkaterSingleSeasonStatsEntity } from '../db/entities/SkaterSingleSeasonStats';
import { TeamEntity } from '../db/entities/Team';
import { TeamSingleSeasonStatsEntity } from '../db/entities/TeamSingleSeasonStats';
import { getPlayerStandings } from '../db/queries/playerStandings';
import { getTeamStandings } from '../db/queries/teamStandings';
import { HttpException } from '../exceptions/HttpException';
import logger from '../logger';
import { BaseDataResponse } from '../models/BaseDataResponse';

export const handleBaseRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await TeamEntity.find();
        const players = await PlayerEntity.find();
        const playerStats = await SkaterSingleSeasonStatsEntity.find();
        const goalieStats = await GoalieSingleSeasonStatsEntity.find();

        const playerStandings = await getPlayerStandings();
        const teamStandings = await getTeamStandings();

        const teamStats = await TeamSingleSeasonStatsEntity.find();

        const lastRefresh = await PlayerDataRefresh.find({order: { id: 'DESC' }, take: 1 });
        let refreshTime = '';
        if (lastRefresh[0]) {
            refreshTime = lastRefresh[0].refreshTime;
        } else {
            refreshTime = '9999999999999';
        }

        const response: BaseDataResponse = {
            refreshTime,
            teams: TeamEntity.apiResponseFromArray(teams),
            players: PlayerEntity.apiResponseFromArray(players),
            skaterStats: SkaterSingleSeasonStatsEntity.apiResponseFromArray(playerStats),
            goalieStats: GoalieSingleSeasonStatsEntity.apiResponseFromArray(goalieStats),
            teamStats: TeamSingleSeasonStatsEntity.apiResponseFromArray(teamStats),
            playerStandings,
            teamStandings,
        };

        res.status(200).send(response);
    } catch (err) {
        logger.error(`Could not read database or something: ${err}.`);
        next(new HttpException(500, 'Could not read database or something.'));
    }
};

export const handleRefreshCheckRoute = async (req: Request, res: Response, next: NextFunction) => {
    const clientLastRefresh = req.body.refreshTime;
    const lastRefresh = await PlayerDataRefresh.find({order: { id: 'DESC' }, take: 1 });
    if (!lastRefresh[0] || !clientLastRefresh || lastRefresh[0].refreshTime > clientLastRefresh) {
        res.send({ doRefresh: true });
    } else {
        res.send({ doRefresh: false });
    }
};
