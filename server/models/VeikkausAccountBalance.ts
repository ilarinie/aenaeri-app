export interface VeikkausAccountBalance {
    status: string;
    balances: {
        CASH: {
            type: 'CASH';
            usableBalance: number;
            balance: number;
            frozenBalance: number;
            holdBalance: number;
            currency: 'EUR'
        }
    };
    timerInterval: number;
}
