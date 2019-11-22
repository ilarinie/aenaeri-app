import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { BoxHeader } from '../../components/BoxHeader';
import { RootState } from '../../state/rootReducer';
import { PlayerStandingsPanel } from './PlayerStandingsPanel';
import { TeamStandingsPanel } from './TeamStandingsPanel';

export const Dashboard: React.FC<RouteComponentProps> = () => {

    const baseData = useSelector((state: RootState) => state.baseData);

    return (
        <DashboardContainer>
            <DashboardGridItem gridRow='1 / 1' gridColumn='1 / 7'>
                <BoxHeader>Player standings</BoxHeader>
                <PlayerStandingsPanel
                    playerStandings={baseData.playerStandings}
                    goalieStats={baseData.goalieStats}
                    skaterStats={baseData.skaterStats}
                    playerObject={baseData.players.playerObject}
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
                    teamStandings={baseData.teamStandings}
                    teams={baseData.teams}
                    teamStats={baseData.teamStats}
                />

            </DashboardGridItem>
        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
    display: grid;
    grid-column-gap: 1em;
    grid-row-gap: 0.5em;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 80% 20%;
    padding: 0.5em;
    max-height: calc(100% - 1em);
    overflow: hidden;
`;

const DashboardGridItem = styled.div<{ gridRow: string, gridColumn: string }>`
    grid-column: ${(props) => props.gridColumn};
    grid-row: ${(props) => props.gridRow};
    overflow: auto;
    padding: 0.5em;
`;
