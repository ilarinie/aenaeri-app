import React from 'react';
import styled from 'styled-components';
import { SeasonStatsObject, TeamBaseDataResponse, TeamStandings } from '../../../server/models/BaseDataResponse';
import { TeamSingleSeasonStats } from '../../../server/models/TeamSingleSeasonStats';
import { BoxHeader } from '../../components/BoxHeader';
import { SmallTeamRow } from '../../components/SmallTeamRow';
import { TEAMS_ROUTE } from '../../routes';
import { getTeamLogoUri } from '../../utils/teamLogoUri';

interface TeamStandingsPanelProps {
    teamStandings: TeamStandings;
    teams: TeamBaseDataResponse;
    teamStats: SeasonStatsObject<TeamSingleSeasonStats>;
}

export const TeamStandingsPanel = React.memo<TeamStandingsPanelProps>(({ teamStandings, teams, teamStats }) => {

    const renderTeams = (teamIds: string[]) => (
        teamIds.map((teamId, index) => (
            <SmallTeamRow
                link={TEAMS_ROUTE + teamId}
                key={teamId}
                index={index + 1}
                logoUri={getTeamLogoUri(teamId)}
                mainText={teams.teamObject[teamId].name}
                statistic={teamStats[teamId].statObject['20192020'].pts.toFixed(0)}
                statisticNominator={teamStats[teamId].statObject['20192020'].gamesPlayed + 'gp'}
            />
        ))
    );

    return (
        <TeamStandingsPanelContainer>
            <GridContainer gridRow='1 / 1' gridColumn='1 / 1' >
                <BoxHeader>Central</BoxHeader>
                <StandingsContainer rows={8}>
                    {renderTeams(teamStandings.central)}
                </StandingsContainer>
            </GridContainer>
            <GridContainer gridRow='1 / 1' gridColumn='2 / 2' >
                <BoxHeader>Atlantic</BoxHeader>
                <StandingsContainer rows={8}>
                    {renderTeams(teamStandings.atlantic)}
                </StandingsContainer>
            </GridContainer>
            <GridContainer gridRow='2 / 2' gridColumn='1 / 1' >
                <BoxHeader>Pacific</BoxHeader>
                <StandingsContainer rows={8}>
                    {renderTeams(teamStandings.pacific)}
                </StandingsContainer>
            </GridContainer>
            <GridContainer gridRow='2 / 2' gridColumn='2 / 2' >
                <BoxHeader>Metropolitan</BoxHeader>
                <StandingsContainer rows={8}>
                    {renderTeams(teamStandings.metropolitan)}
                </StandingsContainer>
            </GridContainer>
            <GridContainer gridRow='3 / 3' gridColumn='1 / 1' >
                <BoxHeader>Western confrence</BoxHeader>
                <StandingsContainer rows={8}>
                    {renderTeams(teamStandings.western)}
                </StandingsContainer>
            </GridContainer>
            <GridContainer gridRow='3 / 3' gridColumn='2 / 2' >
                <BoxHeader>Eastern Confrence</BoxHeader>
                <StandingsContainer rows={8}>
                    {renderTeams(teamStandings.eastern)}
                </StandingsContainer>
            </GridContainer>
        </TeamStandingsPanelContainer>
    );
});

const StandingsContainer = styled.div<{ rows: number}>`
    min-height: calc( ${(props) => props.rows} * 20px);
    min-width: 100%;
`;

const GridContainer = styled.div<{ gridRow: string, gridColumn: string}>`
    grid-column: ${(props) => props.gridColumn};
    grid-row: ${(props) => props.gridRow};
    width: 100%;
    height: 100%;
    padding: 0 0.5em;
`;

const TeamStandingsPanelContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 27% 27% 46%;
    grid-column-gap: 0.5em;
    grid-row-gap: 0.5em;
    overflow: hidden;
    height: calc(1005 - 3em);
    width: 100%;
    padding: 0.5em;
`;
