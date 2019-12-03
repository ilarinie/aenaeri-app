import Axios from 'axios';

export namespace VeikkausService {

    export const checkVeikkausLoginDetails = async (vLogin: string, vPass: string): Promise<boolean> => {
        const login_req = { type: 'STANDARD_LOGIN', login: vLogin, password: vPass};
        try {
            await Axios.request({ url: 'https://www.veikkaus.fi/api/bff/v1/sessions', method: 'POST', data: login_req });
            return Promise.resolve(true);
        } catch (err) {
            return Promise.resolve(false);
        }
    };

}
