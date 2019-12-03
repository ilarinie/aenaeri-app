import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { StatisticChart } from '../../components/StatisticChart/StatisticChart';
import { RootState } from '../../state/rootReducer';
import { fetchGameData } from '../../state/thunks/GameDataThunk';
import { PlayerBasicInfoPanel } from './PlayerBasicInfoPanel';

export const PlayerDetail: React.FC<RouteComponentProps<{ id: string; }>> = ({ match }) => {

    const player = useSelector((state: RootState) => state.baseData.players.playerObject[match.params.id]);
    const gameData = useSelector((state: RootState) => state.gameData[match.params.id] ? state.gameData[match.params.id].seasonObject['20192020'] : null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGameData(match.params.id, '20192020'));
    }, [dispatch, match.params.id]);

    return (
        <PlayerDetailsContainer>
            <Content>
                {player && <PlayerBasicInfoPanel player={player} />}
                {gameData &&
                    <>
                        <h4>Season 2019-2020 performance</h4>
                        <StatisticChart data={{ [match.params.id]: gameData }} stat='goals' />
                    </>
                }
            </Content>
        </PlayerDetailsContainer>
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
