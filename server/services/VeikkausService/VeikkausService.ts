import axios from 'axios';
import logger from '../../logger';
import { ExtendedBoxScore } from '../../models/ExtendedBoxScoreType';
import { VeikkausAccountBalance } from '../../models/VeikkausAccountBalance';
import { ExtendedBoxScoreSchemaType, ExtendedBoxScoreSchemaDocumentType } from '../../db/mongo/ExtendedBoxScoreSchema';
import fs from 'fs';
import { VeikkausEventsResponse } from './VeikkausEventsResponse';

const getEventAddress = (ids: string[]): string => {
  return `https://www.veikkaus.fi/api/v1/sport-games/draws?game-names=EBET&lang=fi&event-ids=${ids.join(',')}`;
};

export namespace VeikkausService {

    const BASE_URL = 'https://www.veikkaus.fi/api/';

    export const getVeikkausAccountBalance = async (vLogin: string, vPass: string): Promise<VeikkausAccountBalance> => {
        const loginReq = { type: 'STANDARD_LOGIN', login: vLogin, password: vPass};
        const axiosInstance = axios.create({ withCredentials: true });
        try {
            const loginResponse = await axiosInstance.request({ url: `${BASE_URL}bff/v1/sessions`, method: 'POST', data: loginReq });
            const accountBalanceResponse = await axiosInstance.request<VeikkausAccountBalance>({ url: `${BASE_URL}/v1/players/self/account`, method: 'GET', headers: { 'Cookie': loginResponse.headers['set-cookie'][0].split(';')[0] + ';' + loginResponse.headers['set-cookie'][1].split(';')[0], 'X-ESA-API-Key': 'ROBOT'} });
            return Promise.resolve(accountBalanceResponse.data);
        } catch (err) {
            logger.error(JSON.stringify(err, null, 2));
            return Promise.reject('Could not get Veikkaus account balance');
        }
    };

    export const getVeikkausOdds = async (games: ExtendedBoxScoreSchemaDocumentType[]) => {
        let newGames = games;
        try {
            const response = await axios.request<{
                events: Array<{
                    id: string;
                    name: string;
                    date: number; 
                }>
            }>({ url: `${BASE_URL}/v1/sports/3/categories/2/tournaments/1?lang=fi`, headers: { 'X-ESA-API-Key': 'ROBOT' }});
            fs.writeFileSync('events.json', JSON.stringify(response.data, null , 2));
            const events = [] as string[];

            const gameEventMap: {
                [eventId: string]: ExtendedBoxScoreSchemaDocumentType
            } = {

            };

            games.forEach((game) => {
                const event = response.data.events.filter((d) => new Date(d.date).getTime() === game.gameData.datetime.dateTime.getTime() && d.name.includes(game.gameData.teams.home.locationName))[0];
                if (event) {
                    gameEventMap[event.id] = game;
                    events.push(event.id);
                }
            });
            logger.info('Events fetched: ' + events.toString())

            const oddsData = await axios.get(getEventAddress(events), { headers: { 'X-ESA-API-Key': 'ROBOT'}});
            const oneXtwoOdds: VeikkausEventsResponse[] = oddsData.data.draws.filter((a:any) => a.rows[0].shortName === '1X2');

            const games2 = await Promise.all([ ...Object.keys(gameEventMap).map(key => {
                const oddsForGame = oneXtwoOdds.filter(a => a.rows[0].eventId == key)[0];
                if (oddsForGame) {
                    gameEventMap[key].odds = {
                        homeOdds: oddsForGame.rows[0].competitors[0].odds.odds,
                        awayOdds: oddsForGame.rows[0].competitors[1].odds.odds,
                        drawOdds: oddsForGame.rows[0].competitors[2].odds.odds,
                        updatedAt: new Date().getTime(),
                        source: 'veikkaus'
                    }

                    return gameEventMap[key].save();
                }
            })
            ]);
            return Promise.resolve(games2.filter(g => g != null));

        } catch (err) {
            logger.error('Something went wrong ' + err);
        }

    };

}
