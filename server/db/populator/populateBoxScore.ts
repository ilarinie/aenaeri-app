import axios from 'axios';
import logger from '../../logger';
import ExtendedBoxScoreSchema, { ExtendedBoxScoreSchemaType } from '../mongo/ExtendedBoxScoreSchema';
import { ExtendedBoxScore } from '../mongo/ExtendedBoxScoreType';
import * as mongoose from 'mongoose';

export const populateBoxScores = async () => {
    const gamesFrom2018 = await ExtendedBoxScoreSchema.findOne({ gamePk: 2018020001 });
    const gameIds = [] as string[];

    if (gamesFrom2018 == null) {
        gameIds.push(...generateRange('2018'));
    }

    const gamesFrom2019 = await ExtendedBoxScoreSchema.findOne({ gamePk: 2019020001 });
    if (gamesFrom2019 == null) {
        gameIds.push(...generateRange('2019'));
    }




    const arr = generateRange('2019');
    logger.info('Populating box scores');
    await fetchAndCreateBoxScore(arr[0]);
    await fetchAndCreateBoxScore(arr[1]);
    await fetchAndCreateBoxScore(arr[2]);
    await fetchAndCreateBoxScore(arr[3]);
    await fetchAndCreateBoxScore(arr[4]);

    // await Promise.all([
    //     arr.map((gameId: string) => fetchAndCreateBoxScore(gameId)),
    // ]);
    logger.info('Box scores populated');
};

const fetchAndCreateBoxScore = async (gameId: string): Promise<any> => {
    const response = await axios.request<ExtendedBoxScore>({ method: 'GET', url: `https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`});
    const generatedBoxScore: ExtendedBoxScoreSchemaType = {
        ...response.data,
        gameData: {
            ...response.data.gameData,
            players: Object.keys(response.data.gameData.players).map((key) => response.data.gameData.players[key]),
        },
    };
    try {
        const res = await  ExtendedBoxScoreSchema.create(generatedBoxScore);
        return Promise.resolve(res);
    } catch (err) {
        logger.error('Could not save extended box score');
        logger.error(err);
    }
};

const generateRange = (season: string = '2019'): string[] => {
    const arr: string[] = [];
    /**
     * 1271 is the number of regular season games per season (82 games * 31 teams / 2 teams/game);
     */
    for (let i = 1; i <= 1271; i++) {
        const gameNumber: string = season + '02';
        if (i < 10) {
            arr.push(gameNumber + '000' + i);
        } else if (i < 100) {
            arr.push(gameNumber + '00' + i);
        } else if (i < 1000) {
            arr.push(gameNumber + '0' + i);
        } else {
            arr.push(gameNumber + i);
        }
    }
    return arr;
};
