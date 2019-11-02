import React from 'react';
import styled from 'styled-components';
import { SmallPlayerRow } from '../components/SmallPlayerRow';

export default { title: 'SmallPlayerRow' };

const OuterContainer = styled.div`
    background: grey;
`;
const Container = styled.div`
    width: 300px;
    height: 500px;
    margin: 0 auto;
    background-color: black;
`;

export const normal = () => (
    <OuterContainer>
        <Container>
            <SmallPlayerRow playerNumber='16' playerId='8477493' firstName='Alexander' lastName='Barkov' stat={{statName: 'points', statValue: '60' }}/>
        </Container>
    </OuterContainer>
);

export const list = () => (
    <OuterContainer>
        <Container>
            <SmallPlayerRow playerNumber='16' playerId='8477493' firstName='Alexander' lastName='Barkov' stat={{statName: 'points', statValue: '60' }}/>
            <SmallPlayerRow playerNumber='16' playerId='8477493' firstName='Alexander' lastName='Barkov' stat={{statName: 'points', statValue: '60' }}/>
            <SmallPlayerRow playerNumber='16' playerId='8477493' firstName='Alexander' lastName='Barkov' stat={{statName: 'points', statValue: '60' }}/>
            <SmallPlayerRow playerNumber='16' playerId='8477493' firstName='Alexander' lastName='Barkov' stat={{statName: 'points', statValue: '60' }}/>
        </Container>
    </OuterContainer>
);
