import axios from 'axios';
import logger from '../../logger';
import { VeikkausAccountBalance } from '../../models/VeikkausAccountBalance';


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

    export const getNHLGames = async () => {
        try {
            const response = axios.request({ url: `${BASE_URL}/v1/sports/3/categories/2/tournaments/1?lang=fi`, headers: { 'X-ESA-API-Key': 'ROBOT' }})
            return Promise.resolve((await response).data.events.sort((a: any, b: any) => a.date - b.date));

        } catch (err) {
            logger.error('Something went wrong');
        }


    }

}
