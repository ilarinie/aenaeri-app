import React from 'react';
import styled from 'styled-components';
import { ExtendedBoxScoreMock } from '../Mocks/ExtendedBoxScoreMock';
import { NextGameItem } from '../views/BettingDashboard/NextGameItem';

export default { title: 'NextGameItem' };

const OuterContainer = styled.div`
    background: grey;
`;
const Container = styled.div`
    width: 368px;
    height: 500px;
    margin: 0 auto;
    background-color: black;
`;

export const single = () => (
    <OuterContainer>
        <Container>
           <NextGameItem game={ExtendedBoxScoreMock} />
        </Container>
    </OuterContainer>
);
