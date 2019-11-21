import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../state/rootReducer';

export const PlayerDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {

    const player = useSelector((state: RootState) => state.baseData.players.playerObject[match.params.id]);

    return (
        <div>
            <pre><code>{JSON.stringify(player, null, 2)}</code></pre>
            {player && <div>{player.fullName}</div>}
        </div>
    );

};
