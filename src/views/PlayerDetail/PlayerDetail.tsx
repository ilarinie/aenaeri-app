import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Box, Flex } from 'rebass';
import { StatisticChart } from '../../components/StatisticChart/StatisticChart';
import { RootState } from '../../state/rootReducer';
import { GameDataSeason } from '../../state/slices/gameStatsSlice';
import { fetchGameData } from '../../state/thunks/GameDataThunk';
import { PlayerBasicInfoPanel } from './PlayerBasicInfoPanel';

export const PlayerDetail: React.FC<RouteComponentProps<{ id: string; }>> = ({ match }) => {

    const player = useSelector((state: RootState) => state.baseData.players.playerObject[match.params.id]);
    const gameData = useSelector((state: RootState) => state.gameData[match.params.id] ? state.gameData[match.params.id].seasonObject['20212022'] : null);
    const gameDataLastSeason = useSelector((state: RootState) => state.gameData[match.params.id] ? state.gameData[match.params.id].seasonObject['20182019'] : null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGameData(match.params.id, '20212022'));
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
                        <h4>Season 2021-2022 performance</h4>
                        <StatisticChart data={{ [match.params.id + '-20212022']: gameData as GameDataSeason, [match.params.id + '-20202021']: gameDataLastSeason as GameDataSeason }} stat='goals' />
                    </>
                }
            </Box>
        </Flex>
    );

};
