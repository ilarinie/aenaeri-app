import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PulseLoader, RingLoader} from 'react-spinners';
import styled from 'styled-components';
import { ExtendedBoxScore } from '../../../server/models/ExtendedBoxScoreType';
import { RootState } from '../../state/rootReducer';
import { NextGameItem } from './NextGameItem';

interface NextGamesPanelProps {

}

export const NextGamesPanel: React.FC<NextGamesPanelProps> = () => {

    const [daySchedule, setDaySchedule] = useState([] as ExtendedBoxScore[]);
    const teams = useSelector((state: RootState) => state.baseData.teamStats);
    const [ refreshDisabled, setRefreshDisabled ] = useState(false);

    const fetchSchedule = async () => {
        setDaySchedule([]);
        const response = await axios.request<ExtendedBoxScore[]>({ url: '/api/schedule' });
        setDaySchedule(response.data);
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const onRefresh = () => {
        setRefreshDisabled(true);
        fetchSchedule().then(() => {
            setRefreshDisabled(false);
        });
    };

    return (
        <Container>
            <RefreshButton disabled={refreshDisabled} onClick={onRefresh}>
                { refreshDisabled ?
                <RingLoader size='1rem' color='white' />
                :
                'Refresh'}
            </RefreshButton>
            {
                daySchedule[0] && <div>Last refresh {new Date(daySchedule[0].odds[0].updatedAt || '').toLocaleTimeString('fi-FI')}</div>
            }
            <ScheduleContainer>
                {daySchedule.length > 0 ?
                    daySchedule.map((g) => (
                        <NextGameItem width='400px' key={g.gamePk} game={g} teamsStats={teams} />
                    ))
                    :
                    <LoadingContainer>
                        <PulseLoader size={50} color='white' />
                    </LoadingContainer>
                }
            </ScheduleContainer>
        </Container>
    );
};

const RefreshButton = styled.button`
    width: 100px;
    background: black;
    border: 1px solid white;
    height: 2rem;
    color: white;
    margin-bottom: 1em;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
    &:disabled {
        cursor: progress;
    }
`;

const LoadingContainer = styled.div`
   width: 100%;
   height: 300px;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const Container = styled.div`

`;

const ScheduleContainer = styled.div`
display: flex;
flex-wrap: wrap;
`;
