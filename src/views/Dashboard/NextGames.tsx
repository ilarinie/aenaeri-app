import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DaySchedule } from '../../../server/models/DaySchedule';
import { RootState } from '../../state/rootReducer';
import { ExtendedBoxScore } from '../../../server/models/ExtendedBoxScoreType';
import styled from 'styled-components';

interface NextGamesPanelProps {

}

export const NextGamesPanel: React.FC<NextGamesPanelProps> = () => {

    const [daySchedule, setDaySchedule] = useState([] as ExtendedBoxScore[]);
    const teams = useSelector((state: RootState) => state.baseData.teams.teamObject);

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await axios.request<ExtendedBoxScore[]>({ url: '/api/schedule' });
            setDaySchedule(response.data);
        };
        fetchSchedule();
    }, []);

   

    return (
        <div>
            {daySchedule &&
                daySchedule.map((g) => (
                    <div key={g.gamePk}>
                        {new Date(g.gameData.datetime.dateTime).toLocaleDateString('fi-FI')} - {new Date(g.gameData.datetime.dateTime).toLocaleTimeString('fi-FI')} - {g.gameData.teams.away.name} @ {g.gameData.teams.home.name}
                        {g.odds && <><Sep>{g.odds.awayOdds}</Sep><Sep>{g.odds.drawOdds}</Sep><Sep>{g.odds.homeOdds}</Sep></>}
                    </div>
                ))
            }
        </div>
    );
};

const Sep = styled.div`

`  
