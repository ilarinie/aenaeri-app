import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../state/rootReducer';

export const TeamDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {

    const team = useSelector((state: RootState) => state.baseData.teams.teamObject[match.params.id]);

    return (
        <div>
            <pre><code>{JSON.stringify(team, null, 2)}</code></pre>
            {team && <div>{team.name}</div>}
        </div>
    );

};
