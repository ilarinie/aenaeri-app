import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SkaterSingleSeasonStats } from '../../../server/models/SkaterSingleSeasonStats';

interface StatsDetailProps extends RouteComponentProps<{ stat: 'finnishPlayers' | keyof SkaterSingleSeasonStats}> {

}

export const StatsDetail: React.FC<StatsDetailProps> = ({ match }) => {

    return (
        <div>StatsDetail</div>
    );
};