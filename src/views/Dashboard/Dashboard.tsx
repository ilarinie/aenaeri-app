import React from 'react';
import styled from 'styled-components';
import { BaseDataResponse } from '../../../server/models/BaseDataResponse';
import { BoxHeader } from '../../components/BoxHeader';
import { PlayerStandingsPanel } from './PlayerStandingsPanel';
import { TeamStandingsPanel } from './TeamStandingsPanel';

interface DashboardProps {
    dataModel: BaseDataResponse;
}

export const Dashboard: React.FC<DashboardProps> = ({ dataModel }) => {

    return (
        <DashboardContainer>
            <DashboardGridItem gridRow='1 / 1' gridColumn='1 / 7'>
                <BoxHeader>Player standings</BoxHeader>
                <PlayerStandingsPanel
                    playerStandings={dataModel.playerStandings}
                    goalieStats={dataModel.goalieStats}
                    skaterStats={dataModel.skaterStats}
                    playerObject={dataModel.players.playerObject}
                />
            </DashboardGridItem>
            <DashboardGridItem gridRow='2 / 2' gridColumn='1 / 7'>
                <BoxHeader>Next games</BoxHeader>
                <div style={{ minHeight: '7rem'}}>asd
                    asd
                    asd
                    asd
                    asd
                </div>
            </DashboardGridItem>
            <DashboardGridItem gridRow='1 / 3' gridColumn='7 / 13'>
                <BoxHeader>NHL STANDINGS</BoxHeader>
                <TeamStandingsPanel
                    teamStandings={dataModel.teamStandings}
                    teams={dataModel.teams}
                    teamStats={dataModel.teamStats}
                />

            </DashboardGridItem>
        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
    display: grid;
    width: 100%;
    min-height: 100%;
    height: 500px;
    grid-column-gap: 1em;
    grid-row-gap: 0.5em;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 3fr 1fr;
    padding: 0.5em;
`;

const DashboardGridItem = styled.div<{ gridRow: string, gridColumn: string }>`
    grid-column: ${(props) => props.gridColumn};
    grid-row: ${(props) => props.gridRow};
    width: 100%;
    overflow: auto;
    height: 100%;
    padding: 0.5em;
    background-color: #1E1E1E;
`;
