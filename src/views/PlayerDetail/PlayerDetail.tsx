import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import { StatisticChart } from '../../components/StatisticChart/StatisticChart';
import { RootState } from '../../state/rootReducer';
import { GameDataSeason } from '../../state/slices/gameStatsSlice';
import { fetchGameData } from '../../state/thunks/GameDataThunk';
import { PlayerBasicInfoPanel } from './PlayerBasicInfoPanel';

export const PlayerDetail: React.FC<RouteComponentProps<{ id: string; }>> = ({ match }) => {

    const player = useSelector((state: RootState) => state.baseData.players.playerObject[match.params.id]);
    const gameData = useSelector((state: RootState) => state.gameData[match.params.id] ? state.gameData[match.params.id].seasonObject['20192020'] : null);
    const gameDataLastSeason = useSelector((state: RootState) => state.gameData[match.params.id] ? state.gameData[match.params.id].seasonObject['20182019'] : null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGameData(match.params.id, '20192020'));
    }, [dispatch, match.params.id]);

    return (
        <Flex
            width='100%'
            maxWidth='90vw'
            mx='auto'
        >
            <Box width='100%' maxWidth='90vw'>
                {player && <PlayerBasicInfoPanel player={player} />}
                {gameData &&
                    <>
                        <h4>Season 2019-2020 performance</h4>
                        <StatisticChart data={{ [match.params.id + '-20192020']: gameData as GameDataSeason, [match.params.id + '-20182019']: gameDataLastSeason as GameDataSeason }} stat='goals' />
                    </>
                }
            </Box>
        </Flex>
    );

};

const PlayerDetailsContainer = styled.div`
    overflow: auto;
    height: 100%;
    padding-left: 2em;
    padding-right: 2em;
`;

const Content = styled.div`
    background: var(--semi-dark-gray);
    padding: 2em;
`;
