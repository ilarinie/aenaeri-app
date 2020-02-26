import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Flex } from 'rebass';
import { NextGamesPanel } from './NextGames';

export const BettingDashboard: React.FC<RouteComponentProps> = () => {

    return (
        <Flex>
            <NextGamesPanel />
        </Flex>
    );
};


export default BettingDashboard;