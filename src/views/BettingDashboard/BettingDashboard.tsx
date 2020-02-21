import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { NextGamesPanel } from './NextGames';



export const BettingDashboard: React.FC<RouteComponentProps> = () => {



    return (
        <Container>
            <h1>Betting</h1>
            <NextGamesPanel />
        </Container>
    );
}


const Container = styled.div`
    padding: 2em;
`