import logger from '../../logger';
import { NhlApiService } from '../../services/NHLApiService/NhlApiService';
import { GoalieGameStatsEntity } from '../entities/GoalieGameStats';
import { GoalieSingleSeasonStatsEntity } from '../entities/GoalieSingleSeasonStats';
import { PlayerEntity } from '../entities/Player';
import { SkaterGameStatsEntity } from '../entities/SkaterGameStats';
import { SkaterSingleSeasonStatsEntity } from '../entities/SkaterSingleSeasonStats';

declare function assert(value: unknown): 'asserts value';

export const populatePlayers = async (playerIds: number[]) => {
    logger.info('Populating players');
    const beginPlayerFetch = new Date().getTime();
    let sum = 0;
    let avg = 5000;
    await PlayerEntity.clear();
    await SkaterSingleSeasonStatsEntity.clear();
    await GoalieSingleSeasonStatsEntity.clear();
    await SkaterGameStatsEntity.clear();
    await GoalieGameStatsEntity.clear();

    for (let i = 0; i < playerIds.length; i++) {
        const id = playerIds[i];
        const index = i;
        const start = new Date().getTime();
        const playerResponse = await NhlApiService.fetchPlayer(id);
        let player = null;
        try {
            player = await PlayerEntity.fromNHLApiResponse(playerResponse).save();
        } catch (err) {
            logger.error(`Error saving player ${JSON.stringify(playerResponse, null, 2)}`);
            return Promise.reject();
        }
        if (player && player.position === 'Goalie') {
            const statsResponse = await NhlApiService.fetchGoalieSeasonStats(player.id, '20192020');
            if (statsResponse.stats[0].splits[0]) {
                try {
                    await GoalieSingleSeasonStatsEntity.fromNHLApiResonse(statsResponse, id).save();
                } catch (err) {
                    logger.error(err);
                    logger.error(`Error saving goalie stats ${JSON.stringify(statsResponse, null, 2)}`);
                    return Promise.reject();
                }
            }
            const gameByGameResponse = await NhlApiService.fetchGoalieGameByGameStats(player.id, '20192020');
            if (gameByGameResponse.stats[0].splits[0]) {
                try {
                    const entities = GoalieGameStatsEntity.fromNHLApiResponse(gameByGameResponse, id);
                    await Promise.all([
                        ...entities.map((e) => e.save()),
                    ]);
                } catch (err) {
                    logger.error(`Error saving goalie stats ${JSON.stringify(gameByGameResponse, null, 2)}`);
                    return Promise.reject();
                }
            }
        } else {
            const statsResponse = await NhlApiService.fetchSkaterSeasonStats(player.id, '20192020');
            if (statsResponse.stats[0].splits[0]) {
                try {
                    await SkaterSingleSeasonStatsEntity.fromNHLApiResonse(statsResponse, id).save();
                } catch (err) {
                    logger.error(`Error saving skater stats: err : ${err}, entity:  ${JSON.stringify(statsResponse, null, 2)}`);
                    return Promise.reject();
                }
            }
            const gameByGameResponse = await NhlApiService.fetchSkaterGameByGameStats(player.id, '20192020');
            if (gameByGameResponse.stats[0].splits[0]) {
                try {
                    const entities = SkaterGameStatsEntity.fromNHLApiResponse(gameByGameResponse, id);
                    await Promise.all([
                        ...entities.map((e) => e.save()),
                    ]);
                } catch (err) {
                    logger.error(`Error saving skater stats ${JSON.stringify(gameByGameResponse, null, 2)}`);
                    return Promise.reject();
                }
            }
        }
        const end = new Date().getTime();
        const diff = end - start;
        sum = sum + diff;
        avg = i > 0 ? sum / (i + 1) : sum;
        logger.info(`Estimated time remaining ${((avg * (playerIds.length - i)) / 1000).toFixed(2)}, fetching player ${index} of ${playerIds.length}`);
    }
    const endPlayerFetch = new Date().getTime();
    const totalDiff = ((endPlayerFetch - beginPlayerFetch) / 1000).toFixed(2) + 's';
    const playerCount = await PlayerEntity.findAndCount();
    assert(playerIds.length === playerCount[1]);
    logger.info(`Player list refresh took ${totalDiff}`);
};
