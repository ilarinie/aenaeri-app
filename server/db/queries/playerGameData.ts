import { getManager } from 'typeorm';
import { GameDataResponse } from '../../models/GameDataResponse';

export const getPlayerGameStats = async (playerId: string, season: string, goalie: boolean): Promise<GameDataResponse> => {
    const sql = `SELECT * FROM ${goalie ? 'goalie' : 'skater'}_game_stats_entity WHERE "playerId"=${playerId} AND season='${season}' ORDER BY date ASC;`;
    const response = await getManager().query(sql);
    const obj: GameDataResponse = {
        playerId,
        season,
        data: {
            dateList: [],
            gameDataObject: {},
        },
    };
    response.forEach((r: any) => {
        obj.data.dateList.push(r.date);
        obj.data.gameDataObject[r.date] = r;
    });
    return Promise.resolve(obj);
};
