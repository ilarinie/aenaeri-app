import axios from 'axios';
import logger from '../../logger';
import { ExtendedBoxScore } from '../../models/ExtendedBoxScoreType';
import { VeikkausAccountBalance } from '../../models/VeikkausAccountBalance';
import { ExtendedBoxScoreSchemaType, ExtendedBoxScoreSchemaDocumentType } from '../../db/mongo/ExtendedBoxScoreSchema';
import fs from 'fs';
import { VeikkausEventsResponse } from './VeikkausEventsResponse';
import { OddsService, OddsType } from '../OddsService';

type VeikkausEventsResponseType = {
    events: Array<{
        id: string;
        name: string;
        date: number;
    }>
}

let veikkausService: VeikkausService;

export class VeikkausService implements OddsService {

    BASE_URL = 'https://www.veikkaus.fi/api/';


    static getInstance = (): VeikkausService => {
        if (!veikkausService) {
            veikkausService = new VeikkausService();
        }
        return veikkausService;
    }

    getOddsForGames = async (games: ExtendedBoxScoreSchemaDocumentType[]): Promise<OddsType[]> => {


        return Promise.resolve([]);
    }




    getVeikkausAccountBalance = async (vLogin: string, vPass: string): Promise<VeikkausAccountBalance> => {
        const loginReq = { type: 'STANDARD_LOGIN', login: vLogin, password: vPass };
        const axiosInstance = axios.create({ withCredentials: true });
        try {
            const loginResponse = await axiosInstance.request({ url: `${this.BASE_URL}bff/v1/sessions`, method: 'POST', data: loginReq });
            const accountBalanceResponse = await axiosInstance.request<VeikkausAccountBalance>({ url: `${this.BASE_URL}/v1/players/self/account`, method: 'GET', headers: { 'Cookie': loginResponse.headers['set-cookie'][0].split(';')[0] + ';' + loginResponse.headers['set-cookie'][1].split(';')[0], 'X-ESA-API-Key': 'ROBOT' } });
            return Promise.resolve(accountBalanceResponse.data);
        } catch (err) {
            logger.error(JSON.stringify(err, null, 2));
            return Promise.reject('Could not get Veikkaus account balance');
        }
    };



    getVeikkausOdds = async (games: ExtendedBoxScoreSchemaDocumentType[]) => {
        try {
            const gameEventMap = await this.getVeikkausHockeyEventsList(games);

            const oddsResponse = await axios.get(this.getEventAddress(Object.keys(gameEventMap)), { headers: { 'X-ESA-API-Key': 'ROBOT' } });
            const oddsData: VeikkausEventsResponse[] = oddsResponse.data.draws;

            const games2 = await Promise.all([...Object.keys(gameEventMap).map(key => {
                const oddsForGame = oddsData.filter(a => a.rows[0].eventId == key);
                if (!gameEventMap[key].odds) {
                    gameEventMap[key].odds = [];
                } else if (oddsForGame.length !== 0) {
                    gameEventMap[key].odds = gameEventMap[key].odds?.filter(s => s.source !== 'veikkaus');
                }

                fs.writeFileSync('veikkausOdds.json', JSON.stringify(oddsForGame, null, 2))
                oddsForGame.map((odds) => {
                    gameEventMap[key].odds?.push({
                        homeOdds: odds.rows[0].competitors[0].odds.odds,
                        awayOdds: odds.rows[0].competitors[1].odds.odds,
                        drawOdds: odds.rows[0].competitors[2]?.odds.odds,
                        gameName: odds.rows[0].shortName,
                        updatedAt: new Date().getTime(),
                        source: 'veikkaus'
                    });
                });
                
                return gameEventMap[key].save();

            })
            ]);
            return Promise.resolve(games2.filter(g => g != null));

        } catch (err) {
            logger.error('Something went wrong ' + err);
        }

    };

    private getVeikkausHockeyEventsList = async (games: ExtendedBoxScoreSchemaDocumentType[]): Promise<{ [eventId: string]: ExtendedBoxScoreSchemaDocumentType }> => {
        const response = await axios.request<VeikkausEventsResponseType>({ url: `${this.BASE_URL}/v1/sports/3/categories/2/tournaments/1?lang=fi`, headers: { 'X-ESA-API-Key': 'ROBOT' } });
        const events = [] as string[];

        const gameEventMap: {
            [eventId: string]: ExtendedBoxScoreSchemaDocumentType
        } = {};

        games.forEach((game) => {
            const event = response.data.events.filter((d) => new Date(d.date).getTime() === game.gameData.datetime.dateTime.getTime() && d.name.includes(game.gameData.teams.home.locationName))[0];
            if (event) {
                gameEventMap[event.id] = game;
                events.push(event.id);
            }
        });
        return Promise.resolve(gameEventMap);
    }




    private getEventAddress = (ids: string[]): string => {
        return `https://www.veikkaus.fi/api/v1/sport-games/draws?game-names=EBET&lang=fi&event-ids=${ids.join(',')}`;
    };

}
