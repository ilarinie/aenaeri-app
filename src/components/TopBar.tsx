import React from 'react';
import { Link } from 'react-router-dom';
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
            <LinksContainer>
                <NavLink to='/account' selected={window.location.href.includes('/account')}>
                    profile
                </NavLink>
                <NavLink to='/nhl-stats'  selected={window.location.href.includes('/nhl-stats')}>
                    nhl standings
                </NavLink>
            </LinksContainer>
        </TopBarContainer>
    );
};

const LinksContainer = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 2em;
`;

const NavLink = styled(Link)<{ selected: boolean}>`
    color: #eee;
    font-variant: small-caps;
    text-decoration: none;
    margin-right: 1em;
    ${(props) => props.selected && 'font-weight: 700; text-decoration: underline;'}
`;

const TopBarContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 60px;
    background-color: var(--semi-dark-gray);
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
