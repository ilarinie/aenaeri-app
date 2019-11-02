import React from 'react';
import styled from 'styled-components';
import { SeasonStatsObject, TeamBaseDataResponse, TeamStandings } from '../../../server/models/BaseDataResponse';
import { TeamSingleSeasonStats } from '../../../server/models/TeamSingleSeasonStats';
import { BoxHeader } from '../../components/BoxHeader';
import { SmallTeamRow } from '../../components/SmallTeamRow';
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
                key={teamId}
                index={index + 1}
                logoUri={getTeamLogoUri(teamId)}
                mainText={teams.teamObject[teamId].name}
                statistic={teamStats[teamId].statObject['20192020'].pts}
            />
        ))
    );

    return (
        <TeamStandingsPanelContainer>
            <GridContainer gridRow='1 / 1' gridColumn='1 / 1' >
            <BoxHeader>Atlantic</BoxHeader>
                {renderTeams(teamStandings.atlantic)}
            </GridContainer>
            <GridContainer gridRow='1 / 1' gridColumn='2 / 2' >
            <BoxHeader>Central</BoxHeader>
            {renderTeams(teamStandings.central)}

            </GridContainer>
            <GridContainer gridRow='2 / 2' gridColumn='1 / 1' >
            <BoxHeader>Pacific</BoxHeader>
            {renderTeams(teamStandings.pacific)}

            </GridContainer>
            <GridContainer gridRow='2 / 2' gridColumn='2 / 2' >
            <BoxHeader>Metropolitan</BoxHeader>
            {renderTeams(teamStandings.metropolitan)}

            </GridContainer>
            <GridContainer gridRow='3 / 3' gridColumn='1 / 1' >
            <BoxHeader>Western confrence</BoxHeader>
            {renderTeams(teamStandings.western)}

            </GridContainer>
            <GridContainer gridRow='3 / 3' gridColumn='2 / 2' >
                <BoxHeader>Eastern Confrence</BoxHeader>
                {renderTeams(teamStandings.eastern)}

            </GridContainer>
        </TeamStandingsPanelContainer>
    );
});

const GridContainer = styled.div<{ gridRow: string, gridColumn: string}>`
    grid-column: ${(props) => props.gridColumn};
    grid-row: ${(props) => props.gridRow};
    width: 100%;
    height: 100%;
`;

const TeamStandingsPanelContainer = styled.div`
    display: grid;
    grid-template-columns: 45%, 45%;
    grid-template-rows: 1fr 1fr 2fr;
    grid-column-gap: 0.5em;
    grid-row-gap: 0.5em;
    overflow: hidden;
    height: calc(1005 - 3em);
    width: 100%;
    padding: 0.5em;
`;
