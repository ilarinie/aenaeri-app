import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DaySchedule } from '../../../server/models/DaySchedule';
import { RootState } from '../../state/rootReducer';
import { ExtendedBoxScore } from '../../../server/models/ExtendedBoxScoreType';
import styled from 'styled-components';
import { NextGameItem } from './NextGameItem';

interface NextGamesPanelProps {

}

export const NextGamesPanel: React.FC<NextGamesPanelProps> = () => {

    const [daySchedule, setDaySchedule] = useState([] as ExtendedBoxScore[]);
    const teams = useSelector((state: RootState) => state.baseData.teamStats);

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await axios.request<ExtendedBoxScore[]>({ url: '/api/schedule' });
            setDaySchedule(response.data);
        };
        fetchSchedule();
    }, []);

   

    return (
        <Container>
            {daySchedule &&
                daySchedule.map((g) => (
                    <NextGameItem width="400px" key={g.gamePk} game={g} teamsStats={teams} />
                ))
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`  
