import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Player } from '../../../server/models/Player';
import { RootState } from '../../state/rootReducer';
import { banneUrlFromPlayerId } from '../../utils/playerBannerUrl';
import { playerThumbnailUrlFromPlayerId } from '../../utils/playerThumbnailUrl';
import { PlayerBasicInfoHeaderValue } from './PlayerBasicInfoHeaderValue';

interface PlayerBasicInfoPanelProps {
    player: Player;
}

export const PlayerBasicInfoPanel: React.FC<PlayerBasicInfoPanelProps> = ({ player }) => {

    const teams = useSelector((state: RootState) => state.baseData.teams.teamObject);

    return (
        <Container>
            <MetaBackgroundContainer url={banneUrlFromPlayerId(player.id.toString())}>
                <MetaContainer>
                    <StyledImg src={playerThumbnailUrlFromPlayerId(player.id.toString())} alt='player image' />
                    <NameContainer>
                        <h3>{player.fullName}</h3>
                        <p>#{player.primaryNumber} - {player.position} </p>
                        <p>{teams[player.teamId].name}</p>
                    </NameContainer>
                    <InfoContainer>
                        <PlayerBasicInfoHeaderValue header='Age' value={player.currentAge.toString()} />
                        <PlayerBasicInfoHeaderValue header='Weight' value={player.weight.toString()} />
                        <PlayerBasicInfoHeaderValue header='Height' value={player.height.toString()} />
                        <PlayerBasicInfoHeaderValue header='Nationality' value={player.nationality.toString()} />
                        <PlayerBasicInfoHeaderValue header='From' value={`${player.birthCity}`} />
                    </InfoContainer>
                </MetaContainer>
            </MetaBackgroundContainer>
        </Container>
    );
};

const InfoContainer = styled.div`
    border-left: 1px solid #eee;
    padding-left: 2em;
    display: grid;
    width: 40%;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 1fr 1fr;
    p {
        font-size: 11px;
    }
`;

const MetaContainer = styled.div`
     background: rgba(0,0,0,0.7);
     display: flex;
     padding: 2em;
`;

const Container = styled.div`
    margin-top: -2em;
    margin-left: -2em;
    width: calc(100% + 4em);
`;

const NameContainer = styled.div`
    font-weight: 700;
    padding: 0 2em;
    justify-self: center;
    h3 {
        margin-top: 0;
    }
`;

const MetaBackgroundContainer = styled.div<{ url: string; }>`
    width: 100%;
    height: 30em;
    padding: 2em 5em;
    background: url(${(props) => props.url});
    background-size: cover;
    background-repeat: no-repeat;
`;

const StyledImg = styled.img`
    height: 100px;
    border-radius: 25px;
`;
