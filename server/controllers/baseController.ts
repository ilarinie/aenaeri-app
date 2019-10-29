import { NextFunction } from 'express';
import { GoalieSingleSeasonStats, GoalieSingleSeasonStatsEntity } from '../db/entities/GoalieSingleSeasonStats';
import { Player, PlayerEntity } from '../db/entities/Player';
import { SkaterSingleSeasonStats, SkaterSingleSeasonStatsEntity } from '../db/entities/SkaterSingleSeasonStats';
import { Team, TeamEntity } from '../db/entities/Team';
import logger from '../logger';

export const handleBaseRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await TeamEntity.find();
        const players = await PlayerEntity.find();
        const playerStats = await SkaterSingleSeasonStatsEntity.find();
        const goalieStats = await GoalieSingleSeasonStatsEntity.find();
    } catch (err) {
        logger.error(`Could not read database or something: ${err}.`)
    }
};

export interface BaseDataResponse {
    teams: {
        teamList: string[];
        teamObject: {
            [key: string]: Team;
        }
    };
    players: {
        playerList: string[];
        playerObject: {
            [key: string]: Player;
        }
    };
    skaterCurrentSeasonStats: {
        playerList: string[];
        statObject: {
            [key: string]: SkaterSingleSeasonStats;
        }
    };
    goalieCurrentSeasonStats: {
        playerList: string[];
        statObject: {
            [key: string]: GoalieSingleSeasonStats;
        }
    };
}
