import axios from 'axios';
import logger from '../../logger';
import ExtendedBoxScoreSchema, { ExtendedBoxScoreSchemaType } from '../mongo/ExtendedBoxScoreSchema';
import { ExtendedBoxScore } from '../mongo/ExtendedBoxScoreType';

export const populateBoxScores = async () => {
    const arr = generateRange('2019');
    logger.info('Populating box scores');
    await fetchAndCreateBoxScore(arr[0]);
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
    return ExtendedBoxScoreSchema.create(generatedBoxScore);
};

const generateRange = (season: string = '2019'): string[] => {
    const arr: string[] = [];
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
