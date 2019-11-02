import { getManager } from 'typeorm';
import logger from '../../logger';
import { PlayerStandings } from '../../models/BaseDataResponse';
import { GoalieSingleSeasonStats } from '../../models/GoalieSingleSeasonStats';
import { SkaterSingleSeasonStats } from '../../models/SkaterSingleSeasonStats';
import { PlayerEntity } from '../entities/Player';

export const getPlayerStandings = async (): Promise<PlayerStandings> => {

    const resp = await Promise.all([
        getSkatersOrderedByStat('points'),
        getSkatersOrderedByStat('goals'),
        getSkatersOrderedByStat('assists'),
        getSkatersOrderedByStatAndWhereClause('points', [{ column: 'nationality', clause: 'FIN'}]),
        getGoaliesOrderedByStat(`"savePercentage"` as keyof GoalieSingleSeasonStats, false),
        getGoaliesOrderedByStat(`"goalAgainstAverage"` as keyof GoalieSingleSeasonStats, true),
        getSkatersOrderedByStat('ppg'),
        getSkatersOrderedByStat('gpg'),
    ]);

    return Promise.resolve({
        points: resp[0],
        goals: resp[1],
        assists: resp[2],
        finnishPlayers: resp[3],
        savePct: resp[4],
        gaa: resp[5],
        ppg: resp[6],
        gpg: resp[7],
    });

};

const getSkatersOrderedByStat = async (stat: keyof SkaterSingleSeasonStats): Promise<string[]> => {
    const sql = `SELECT "playerId" FROM skater_single_season_stats_entity ORDER BY ${stat} DESC LIMIT 100;`;
    const res = await getManager().query(sql);
    logger.debug(sql);
    return Promise.resolve(res.map((e: { playerId: string }) => e.playerId));
};

const getSkatersOrderedByStatAndWhereClause = async (stat: keyof SkaterSingleSeasonStats, clauses: Array<{column: keyof PlayerEntity, clause: string}> = []) => {
    const sql = `SELECT "playerId" FROM skater_single_season_stats_entity LEFT JOIN player_entity
    ON "playerId" = player_entity.id ${generateWhereClause(clauses)} ORDER BY points DESC LIMIT 100;`;
    const res = await getManager().query(sql);
    logger.debug(sql);
    return Promise.resolve(res.map((e: { playerId: string }) => e.playerId));
};

const getGoaliesOrderedByStat = async (stat: keyof GoalieSingleSeasonStats, reverse: boolean): Promise<string[]> => {
    const sql = `SELECT "playerId" FROM goalie_single_season_stats_entity ORDER BY ${stat} ${reverse ? 'ASC' : 'DESC'} LIMIT 100;`;
    const res = await getManager().query(sql);
    logger.info(sql);
    return Promise.resolve(res.map((e: { playerId: string }) => e.playerId));
};

const getGoaliesOrderedByStatAndWhereClause = async (stat: keyof GoalieSingleSeasonStats, clauses: Array<{column: keyof PlayerEntity, clause: string}> = []) => {
    const sql = `SELECT "playerId" FROM goalie_single_season_stats_entity LEFT JOIN player_entity
    ON "playerId" = player_entity.id ${generateWhereClause(clauses)} ORDER BY points DESC LIMIT 100;`;
    const res = await getManager().query(sql);
    logger.debug(sql);
    return Promise.resolve(res.map((e: { playerId: string }) => e.playerId));
};

const generateWhereClause = (clauses: Array<{ column: string, clause: string}>): string => {
    if (clauses.length === 0) {
        return '';
    }
    let completeClause = 'WHERE ';
    clauses.forEach((clause, index) => {
        if (index > 0) {
            completeClause = completeClause + ' AND ';
        }
        completeClause = completeClause + `${clause.column} = '${clause.clause}'`;
    });
    return completeClause;
};
