import Axios from 'axios';

export namespace VeikkausService {

    export const checkVeikkausLoginDetails = async (vLogin: string, vPass: string): Promise<boolean> => {
        const loginReq = { type: 'STANDARD_LOGIN', login: vLogin, password: vPass};
        try {
            await Axios.request({ url: 'https://www.veikkaus.fi/api/bff/v1/sessions', method: 'POST', data: loginReq });
            return Promise.resolve(true);
        } catch (err) {
            return Promise.resolve(false);
        }
    };

}
