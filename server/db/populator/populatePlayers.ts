
import logger from '../../logger';
import { NhlApiService } from '../../services/NHLApiService/NhlApiService';
import { GoalieGameStatsEntity } from '../entities/GoalieGameStats';
import { GoalieSingleSeasonStatsEntity } from '../entities/GoalieSingleSeasonStats';
import { PlayerEntity } from '../entities/Player';
import { SkaterGameStatsEntity } from '../entities/SkaterGameStats';
import { SkaterSingleSeasonStatsEntity } from '../entities/SkaterSingleSeasonStats';

const CURRENT_SEASON = '20192020';

export const populatePlayers = async (playerIds: number[]) => {
    logger.info('Populating players');
    const beginPlayerFetch = new Date().getTime();
    let sum = 0;
    // const avg = 5000;
    await PlayerEntity.clear();
    await SkaterSingleSeasonStatsEntity.delete({ season: CURRENT_SEASON });
    await GoalieSingleSeasonStatsEntity.delete({ season: CURRENT_SEASON });
    await SkaterGameStatsEntity.delete({ season: CURRENT_SEASON });
    await GoalieGameStatsEntity.delete({ season: CURRENT_SEASON });
    const errors: string[] = [];

    await Promise.all(playerIds.map(async (id) => {
        // const id = playerIds[i];
        // const index = i;
        const start = new Date().getTime();
        const playerResponse = await NhlApiService.fetchPlayer(id);
        let player: PlayerEntity | null  = null;
        try {
            player = await PlayerEntity.fromNHLApiResponse(playerResponse).save();
        } catch (err) {
            logger.error(`Error saving player ${JSON.stringify(playerResponse, null, 2)}`);
            errors.push(err);
        }
        if (player && player.position === 'Goalie') {
            await populateGoalieStats(player.id, CURRENT_SEASON);
            const res = await GoalieGameStatsEntity.find({ where: { season: '20182019', playerId: player.id}});
            if (res.length === 0) {
                await populateGoalieStats(player.id, '20182019');
            }
        } else if (player) {
            await populatePlayerStats(player.id, CURRENT_SEASON);
            const res = await SkaterGameStatsEntity.find({ where: { season: '20182019', playerId: player.id}});
            if (res.length === 0) {
                await populatePlayerStats(player.id, '20182019');
            }
        }
        const end = new Date().getTime();
        const diff = end - start;
        sum = sum + diff;
        // avg = i > 0 ? sum / (i + 1) : sum;
        // logger.info(`Estimated time remaining ${((avg * (playerIds.length - i)) / 1000).toFixed(2)}, fetching player ${index} of ${playerIds.length}`);
    }));

    const endPlayerFetch = new Date().getTime();
    const totalDiff = ((endPlayerFetch - beginPlayerFetch) / 1000).toFixed(2) + 's';
    const playerCount = await PlayerEntity.findAndCount();
    logger.info(`Player list refresh took ${totalDiff}, fetched ${playerCount} players`);
    logger.info(`${errors.length} errors detected.`);
    logger.info(`${errors[0]}`);
};

const populateGoalieStats = async (playerId: number, season: string): Promise<string[]> => {
    const errors: string[] = [];
    const statsResponse = await NhlApiService.fetchGoalieSeasonStats(playerId, season);
    if (statsResponse.stats[0].splits[0]) {
        try {
            await GoalieSingleSeasonStatsEntity.fromNHLApiResonse(statsResponse, playerId).save();
        } catch (err) {
            logger.debug(err);
            // logger.debug(`Error saving goalie stats ${JSON.stringify(statsResponse, null, 2)}`);
            errors.push(err);
        }
    }
    const gameByGameResponse = await NhlApiService.fetchGoalieGameByGameStats(playerId, season);
    if (gameByGameResponse.stats[0].splits[0]) {
        try {
            const entities = GoalieGameStatsEntity.fromNHLApiResponse(gameByGameResponse, playerId);
            await Promise.all([
                ...entities.map((e) => e.save()),
            ]);
        } catch (err) {
            // logger.error(`Error saving goalie stats ${JSON.stringify(gameByGameResponse, null, 2)}`);
            errors.push(err);
        }
    }
    return Promise.resolve(errors);
};

const populatePlayerStats = async (playerId: number, season: string): Promise<string[]> => {
    const errors: string[] = [];
    const statsResponse = await NhlApiService.fetchSkaterSeasonStats(playerId, season);
    if (statsResponse.stats[0].splits[0]) {
        try {
            await SkaterSingleSeasonStatsEntity.fromNHLApiResonse(statsResponse, playerId).save();
        } catch (err) {
            // logger.error(`Error saving skater stats: err : ${err}, entity:  ${JSON.stringify(statsResponse, null, 2)}`);
            errors.push(err);
        }
    }
    const gameByGameResponse = await NhlApiService.fetchSkaterGameByGameStats(playerId, season);
    if (gameByGameResponse.stats[0].splits[0]) {
        try {
            const entities = SkaterGameStatsEntity.fromNHLApiResponse(gameByGameResponse, playerId);
            await Promise.all([
                ...entities.map((e) => e.save()),
            ]);
        } catch (err) {
            // logger.error(`Error saving skater stats ${JSON.stringify(gameByGameResponse, null, 2)}`);
            errors.push(err);
        }
    }
    return Promise.resolve(errors);
};
