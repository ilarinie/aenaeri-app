import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import { Player } from '../../../server/models/Player';
import { RootState } from '../../state/rootReducer';
import { banneUrlFromPlayerId } from '../../utils/playerBannerUrl';
import { PlayerBasicInfoHeaderValue } from './PlayerBasicInfoHeaderValue';

interface PlayerBasicInfoPanelProps {
    player: Player;
}

export const PlayerBasicInfoPanel: React.FC<PlayerBasicInfoPanelProps> = ({ player }) => {

    const teams = useSelector((state: RootState) => state.baseData.teams.teamObject);

    return (
        <Box
            width='100%'
        >
            <MetaBackgroundContainer url={banneUrlFromPlayerId(player.id.toString())}>
                <Flex width='100%' height='100%' justifyContent='center' flexDirection='column' sx={{ textAlign: 'center' }} bg='level1Transparent'>

                    <Box mx={4}>
                        <h3>{player.fullName}</h3>
                        <p>#{player.primaryNumber} - {player.position} </p>
                        <p>{teams[player.teamId].name}</p>
                    </Box>
                    <Box>
                        <PlayerBasicInfoHeaderValue header='Age' value={player.currentAge.toString()} />
                        <PlayerBasicInfoHeaderValue header='Weight' value={player.weight.toString()} />
                        <PlayerBasicInfoHeaderValue header='Height' value={player.height.toString()} />
                        <PlayerBasicInfoHeaderValue header='Nationality' value={player.nationality.toString()} />
                        <PlayerBasicInfoHeaderValue header='From' value={`${player.birthCity}`} />
                    </Box>
                </Flex>
            </MetaBackgroundContainer>
        </Box>
    );
};

const MetaBackgroundContainer = styled.div<{ url: string; }>`
    width: 100%;
    height: 30em;
    background: url(${(props) => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

