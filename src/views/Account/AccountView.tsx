import React from 'react';
import styled from 'styled-components';
import { useVeikkausAccountBalance } from '../../hooks/useVeikkausAccountBalance';
import { VeikkausAccountBalance } from '../../../server/models/VeikkausAccountBalance';

interface AccountViewProps {

}

export const AccountView: React.FC<AccountViewProps> = () => {

    const veikkausAccountBalance = useVeikkausAccountBalance();

    return (
        <Container>
            <div>
            AccountView
            </div>
            <VeikkausBalanceDisplay veikkausAccountBalance={veikkausAccountBalance} />
        </Container>
    );
};

const Container = styled.div`
    padding: 2em;
`;

const VeikkausBalanceDisplay = React.memo<{ veikkausAccountBalance?: VeikkausAccountBalance }>(({veikkausAccountBalance}) => {
    if (!veikkausAccountBalance) {
        return (
            <div>loading..</div>
        )
    }

    const { balances } = veikkausAccountBalance;
    const { CASH } = balances;
  
    return (
        <div>
            <div>MONEYS</div>
            <div>{CASH.balance}</div>

        </div>
    )
});
