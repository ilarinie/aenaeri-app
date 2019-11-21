import axios from 'axios';
import logger from '../../logger';
import { GoalieSingleSeasonStatsEntity, NHLApiGoalieStatsResponse } from '../entities/GoalieSingleSeasonStats';
import { NHLApiPlayerResponse, PlayerEntity } from '../entities/Player';
import { NHLApiSkaterStatsResponse, SkaterSingleSeasonStatsEntity } from '../entities/SkaterSingleSeasonStats';

const PLAYER_ENDPOINT = 'https://statsapi.web.nhl.com/api/v1/people/';

const statsEndpoint = (playerId: number): string => {
    return `${PLAYER_ENDPOINT}/${playerId}/stats?stats=statsSingleSeason&season=20192020`;
};

export const populatePlayers = async (playerIds: number[]) => {
    logger.info('Populating players');
    const beginPlayerFetch = new Date().getTime();
    let sum = 0;
    let avg = 5000;
    await PlayerEntity.clear();
    await SkaterSingleSeasonStatsEntity.clear();
    await GoalieSingleSeasonStatsEntity.clear();
    playerIds.forEach(async (id, i) => {
        const index = i;
        const start = new Date().getTime();
        const playerResponse = await axios.request<NHLApiPlayerResponse>({ method: 'GET', url: PLAYER_ENDPOINT + '/' + id});
        let player = null;
        try {
            player = await PlayerEntity.fromNHLApiResponse(playerResponse.data).save();
        } catch (err) {
            logger.error(`Error saving player ${JSON.stringify(playerResponse.data, null, 2)}`);
            return Promise.reject();
        }
        if (player && player.position === 'Goalie') {
            const statsResponse = await axios.request<NHLApiGoalieStatsResponse>({ method: 'GET', url: statsEndpoint(id)});
            if (statsResponse.data.stats[0].splits[0]) {
                try {
                    await GoalieSingleSeasonStatsEntity.fromNHLApiResonse(statsResponse.data, id).save();
                } catch (err) {
                    logger.error(`Error saving goalie stats ${JSON.stringify(statsResponse.data, null, 2)}`);
                    return Promise.reject();
                }
            }
        } else {
            const statsResponse = await axios.request<NHLApiSkaterStatsResponse>({ method: 'GET', url: statsEndpoint(id)});
            if (statsResponse.data.stats[0].splits[0]) {
                try {
                    await SkaterSingleSeasonStatsEntity.fromNHLApiResonse(statsResponse.data, id).save();
                } catch (err) {
                    logger.error(`Error saving skater stats: err : ${err}, entity:  ${JSON.stringify(statsResponse.data, null, 2)}`);
                    return Promise.reject();
               }
            }
        }
        const end = new Date().getTime();
        const diff = end - start;
        sum = sum + diff;
        avg = i > 0 ? sum / (i + 1)  : sum;
        logger.info(`Estimated time remaining ${((avg * (playerIds.length - i)) / 1000).toFixed(2) }, fetching player ${index} of ${playerIds.length}`);
    });
    const endPlayerFetch = new Date().getTime();
    const totalDiff = ((endPlayerFetch - beginPlayerFetch) / 1000).toFixed(2) + 's';
    logger.info(`Player list refresh took ${totalDiff}`);
};
