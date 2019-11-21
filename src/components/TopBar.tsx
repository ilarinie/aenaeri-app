import React from 'react';
import styled from 'styled-components';
import { PlayerBaseDataResponse, TeamBaseDataResponse } from '../../server/models/BaseDataResponse';
import { ROOT_ROUTE } from '../routes';
import { TopBarSearch } from './TopBarSearch';

interface TopBarProps {
    players: PlayerBaseDataResponse;
    teams: TeamBaseDataResponse;
    navigate: (path: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ players, teams, navigate }) => {

    return (
        <TopBarContainer>
            <TitleContainer onClick={() => navigate(ROOT_ROUTE)}>
                NHL APP
            </TitleContainer>
            <TopBarSearch navigate={navigate} teams={teams} players={players} />
        </TopBarContainer>
    );
};

const TopBarContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 60px;
    background-color: #1E1E1E;
    display: flex;
    align-items: center;
`;

const TitleContainer = styled.div`
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 2px;
    font-variant: small-caps;
    width: 10rem;
    cursor: pointer;
    padding: 0 0.5em;
`;
