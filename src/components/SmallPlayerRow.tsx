import React from 'react';
import styled from 'styled-components';
import { playerThumbnailUrlFromPlayerId } from '../utils/playerThumbnailUrl';

interface SmallPlayerRowProps {
    firstName: string;
    lastName: string;
    playerId: string;
    playerNumber: string;
    stat?: {
        statName: string;
        statValue: string;
    };
}

export const SmallPlayerRow =  React.memo<SmallPlayerRowProps>(({ firstName, lastName, playerNumber, playerId, stat }) => {

    return (
        <SmallPlayerRowContainer>
            <PlayerMetaInfoContainer>
                <StyledPlayerAvatar src={playerThumbnailUrlFromPlayerId(playerId)} />
                <PlayerNumberContainer>
                    #{playerNumber}
                </PlayerNumberContainer>
                <PlayerNameContainer >
                    <div>{firstName}</div>
                    <span>{lastName}</span>
                </PlayerNameContainer>
            </PlayerMetaInfoContainer>
            <StatContainer>
                <div>{stat && stat.statValue}</div>
                <span>{stat && stat.statName}</span>
            </StatContainer>
        </SmallPlayerRowContainer>
    );

});

const SmallPlayerRowContainer = styled.div`
    height: 3em;
    width: 100%;
    border-bottom: 1px solid gray;
    background: white;
    display: flex;
    justify-content: space-between;
`;

const PlayerNumberContainer = styled.div`
    font-size: 30px;
    margin-left: 0.3em;
    min-width: 2em;
    font-family: monospace;
`;

const StatContainer = styled.div`
    width: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
        margin-bottom: -0.1em;
        font-size: 35px;
        font-weight: 600;
    }
    span {
        margin-top: -0.3em;
        font-size: 9px;
    }
`;

const PlayerNameContainer = styled.div`
    margin-left: 0.5em;
    text-transform: uppercase;
    font-variant: small-caps;
    &:hover {
        text-decoration: underline;
    }
    div {
        font-size: 10px;
        margin-bottom: -0.2em;
    }
    span {
        font-size: 23px;
        font-weight: 600;
    }
`;

const StyledPlayerAvatar = styled.img`
    height: 40px;
    width: 40px;
`;

const PlayerMetaInfoContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
