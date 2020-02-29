import axios from 'axios';
import { ExtendedBoxScoreSchemaDocumentType } from '../../db/mongo/ExtendedBoxScoreSchema';
import logger from '../../logger';
import { OddsGameType } from '../../models/OddsGameType';
import { VeikkausAccountBalance } from '../../models/VeikkausAccountBalance';
import { OddsService } from '../OddsService';
import { VeikkausEventsResponse } from './VeikkausEventsResponse';

interface VeikkausEventsResponseType {
    events: Array<{
        id: string;
        name: string;
        date: number;
    }>;
}

export const getNormalizedLocationName = (locationName: string, teamName: string): string => {
    switch (locationName) {
        case 'Montréal':
            return 'Montreal';
        case 'St. Louis':
            return 'St.Louis';
        case 'New York':
            if (teamName === 'New York Rangers') {
                return 'NY Rangers';
            } else {
                return 'NY Islanders';
            }
        default:
            return locationName;
    }

};

let veikkausService: VeikkausService;

export class VeikkausService implements OddsService {

    public static getInstance = (): VeikkausService => {
        if (!veikkausService) {
            veikkausService = new VeikkausService();
        }
        return veikkausService;
    }

    public BASE_URL = 'https://www.veikkaus.fi/api/';

    public addOddsForGames = async (games: ExtendedBoxScoreSchemaDocumentType[]): Promise<ExtendedBoxScoreSchemaDocumentType[]> => {
        try {
            const gameEventMap = await this.getVeikkausHockeyEventsList(games);

            const oddsResponse = await axios.get(this.getEventAddress(Object.keys(gameEventMap)), { headers: { 'X-ESA-API-Key': 'ROBOT' } });
            const oddsData: VeikkausEventsResponse[] = oddsResponse.data.draws;

            const games2 = await Promise.all([...Object.keys(gameEventMap).map((key) => {
                const oddsForGame = oddsData.filter((a) => a.rows[0].eventId == key);
                if (!gameEventMap[key].odds) {
                    gameEventMap[key].odds = [];
                } else if (oddsForGame.length !== 0) {
                    gameEventMap[key].odds = gameEventMap[key].odds?.filter((s) => s.source !== 'veikkaus');
                }

                oddsForGame.forEach((odds) => {
                    const gameType = this.getGameType(odds);

                    if (gameType) {
                        gameEventMap[key].odds?.push({
                            homeOdds: odds.rows[0].competitors[0].odds.odds,
                            awayOdds: odds.rows[0].competitors[1].odds.odds,
                            drawOdds: odds.rows[0].competitors[2]?.odds.odds,
                            gameName: gameType,
                            updatedAt: new Date().getTime(),
                            source: 'veikkaus',
                            bookMakerId: odds.id,
                        });
                    }
                });

                return gameEventMap[key].save();

            }),
            ]);
            return Promise.resolve(games2.filter((g) => g != null));

        } catch (err) {
            logger.error('Something went wrong ' + err);
        }

        return Promise.resolve([]);
    }

    public getGameType = (oddsEvent: any): OddsGameType | null => {
        const row = oddsEvent.rows[0];
        if (row.shortName === '1X2') {
            return '1X2';
        } else if (row.shortName === '12') {
            return '12';
        } else if (row.shortName === 'AWAY_HANDICAP') {
            const { description } = row;
            if (description.includes('+1')) {
                return 'AWAY_HANDICAP+1';
            } else if  (description.includes('+2')) {
                return 'AWAY_HANDICAP+2';
            } else if  (description.includes('+3')) {
                return 'AWAY_HANDICAP+3';
            } else if  (description.includes('+4')) {
                return 'AWAY_HANDICAP+4';
            } else if  (description.includes('+5')) {
                return 'AWAY_HANDICAP+5';
            }
        } else if (row.shortName === 'HOME_HANDICAP') {
            const { description } = row;
            if (description.includes('+1')) {
                return 'HOME_HANDICAP+1';
            } else if  (description.includes('+2')) {
                return 'HOME_HANDICAP+2';
            } else if  (description.includes('+3')) {
                return 'HOME_HANDICAP+3';
            } else if  (description.includes('+4')) {
                return 'HOME_HANDICAP+4';
            } else if  (description.includes('+5')) {
                return 'HOME_HANDICAP+5';
            }
        }
        return null;
    }

    public getVeikkausAccountBalance = async (vLogin: string, vPass: string): Promise<VeikkausAccountBalance> => {
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
    }

    private getVeikkausHockeyEventsList = async (games: ExtendedBoxScoreSchemaDocumentType[]): Promise<{ [eventId: string]: ExtendedBoxScoreSchemaDocumentType }> => {
        const response = await axios.request<VeikkausEventsResponseType>({ url: `${this.BASE_URL}/v1/sports/3/categories/2/tournaments/1?lang=fi`, headers: { 'X-ESA-API-Key': 'ROBOT' } });
        const events = [] as string[];

        const gameEventMap: {
            [eventId: string]: ExtendedBoxScoreSchemaDocumentType,
        } = {};

        games.forEach((game) => {
            const event = response.data.events.filter((d) => {
                return new Date(d.date).getTime() === game.gameData.datetime.dateTime.getTime()
                && d.name.includes(getNormalizedLocationName(game.gameData.teams.home.locationName, game.gameData.teams.home.name))
            })[0];
            if (event) {
                gameEventMap[event.id] = game;
                events.push(event.id);
            }
        });

        return Promise.resolve(gameEventMap);

    }

    private getEventAddress = (ids: string[]): string => {
        return `https://www.veikkaus.fi/api/v1/sport-games/draws?game-names=EBET&lang=fi&event-ids=${ids.join(',')}`;
    }

}
