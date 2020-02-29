import { useState, useEffect } from 'react';

import { VeikkausAccountBalance } from '../../server/models/VeikkausAccountBalance';
import Axios from 'axios';

export const useVeikkausAccountBalance = () => {
    const [ veikkausAccountBalance, setVeikkausAccountBalance ] = useState(undefined as undefined | VeikkausAccountBalance);
    useEffect(() => {
        const fetchVeikkausAccountBalance = async () => {
            const balance = await Axios.get<VeikkausAccountBalance>('/api/veikkaus');
            setVeikkausAccountBalance(balance.data);
        }
        fetchVeikkausAccountBalance();
    }, []);

    return veikkausAccountBalance;
}
