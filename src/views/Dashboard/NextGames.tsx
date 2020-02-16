import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DaySchedule } from '../../../server/models/DaySchedule';
import { RootState } from '../../state/rootReducer';

interface NextGamesPanelProps {

}

export const NextGamesPanel: React.FC<NextGamesPanelProps> = () => {

    const [daySchedule, setDaySchedule] = useState(null as DaySchedule | null);
    const teams = useSelector((state: RootState) => state.baseData.teams.teamObject);

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await axios.request<DaySchedule>({ url: '/api/schedule' });
            setDaySchedule(response.data);
        };
        fetchSchedule();
    }, []);

    return (
        <div>
            {/* {daySchedule &&
                daySchedule.games.map((g) => (
                    <div key={g.gamePk}>
                        {teams[g.teams.home.team.id].name} vs {teams[g.teams.away.team.id].name}
                    </div>
                ))
            } */}
        </div>
    );
};
