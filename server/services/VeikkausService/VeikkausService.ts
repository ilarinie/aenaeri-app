import axios from 'axios';
import logger from '../../logger';
import { VeikkausAccountBalance } from '../../models/VeikkausAccountBalance';
import { ExtendedBoxScore } from '../../models/ExtendedBoxScoreType';


export namespace VeikkausService {

    const BASE_URL = 'https://www.veikkaus.fi/api/';

    export const getVeikkausAccountBalance = async (vLogin: string, vPass: string): Promise<VeikkausAccountBalance> => {
        const loginReq = { type: 'STANDARD_LOGIN', login: vLogin, password: vPass};
        const axiosInstance = axios.create({ withCredentials: true });
        try {
            const loginResponse = await axiosInstance.request({ url: `${BASE_URL}bff/v1/sessions`, method: 'POST', data: loginReq });
            const accountBalanceResponse = await axiosInstance.request<VeikkausAccountBalance>({ url: `${BASE_URL}/v1/players/self/account`, method: 'GET', headers: { 'Cookie': loginResponse.headers['set-cookie'][0].split(";")[0] + ';' + loginResponse.headers['set-cookie'][1].split(";")[0], 'X-ESA-API-Key': 'ROBOT'} })
            return Promise.resolve(accountBalanceResponse.data);
        } catch (err) {
            logger.error(JSON.stringify(err, null, 2));
            return Promise.reject('Could not get Veikkaus account balance');
        }
    };

    export const getVeikkausOdds = async (games: ExtendedBoxScore[]) => {
        let newGames = games;
        try {
            const response = await axios.request<{
                id: string;
                name: string;
                date: number; }[]>({ url: `${BASE_URL}/v1/sports/3/categories/2/tournaments/1?lang=fi`, headers: { 'X-ESA-API-Key': 'ROBOT' }})
            const events = [] as any[];
            
            games.forEach((game) => {
                const events = response.data.filter(d => new Date(d.date).getTime() === game.gameData.datetime.dateTime.getTime() && d.name.includes(game.gameData.teams.home.locationName));
                if (events[0]) {
                  
                    /**
                     *  {
    "id": "97395866",
    "name": "Philadelphia - Columbus",
    "date": 1582070400000
  },
  {
    "id": "97395867",
    "name": "Pittsburgh - Toronto",
    "date": 1582070400000
  },



  {
    "draws": [
        {
            "gameName": "EBET",
            "brandName": "6778",
            "id": "1936767",
            "name": "SINGLE",
            "status": "OPEN",
            "openTime": 1581998400000,
            "closeTime": 1582070280000,
            "drawTime": 1582070400000,
            "resultsAvailableTime": 1582149599000,
            "gameRuleSet": {
                "basePrice": 100,
                "maxPrice": 1000000,
                "minStake": 10,
                "maxStake": 100000,
                "minSystemLevel": 1,
                "maxSystemLevel": 10,
                "oddsType": "FIXED"
            },
            "rows": [
                {
                    "id": "1",
                    "status": "OPEN",
                    "includedRowCount": 21,
                    "name": "",
                    "shortName": "1X2",
                    "description": "",
                    "detailedDescription": "",
                    "tvChannel": "Viasat",
                    "competitors": [
                        {
                            "id": "1",
                            "name": "Philadelphia",
                            "number": 5,
                            "odds": {
                                "odds": 213
                            },
                            "status": "ACTIVE",
                            "handicap": "0.00"
                        },
                        {
                            "id": "2",
                            "name": "Columbus",
                            "number": 30,
                            "odds": {
                                "odds": 290
                            },
                            "status": "ACTIVE"
                        },
                        {
                            "id": "3",
                            "name": "Tasapeli",
                            "odds": {
                                "odds": 390
                            },
                            "status": "ACTIVE"
                        }
                    ],
                    "eventId": "97395866",
                    "excludedEvents": [
                        "97395866"
                    ]
                }
            ]
        },
                     */


                }
            })


            return Promise.resolve('asd');

        } catch (err) {
            logger.error('Something went wrong');
        }


    }

}
