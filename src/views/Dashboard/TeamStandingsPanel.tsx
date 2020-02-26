import React from 'react';
import { Box, Flex } from 'rebass';
import { SeasonStatsObject, TeamBaseDataResponse, TeamStandings } from '../../../server/models/BaseDataResponse';
import { TeamSingleSeasonStats } from '../../../server/models/TeamSingleSeasonStats';
import { SmallTeamRow } from '../../components/SmallTeamRow';
import { TEAMS_ROUTE } from '../../routes';
import { mq } from '../../theme';
import { getTeamLogoUri } from '../../utils/teamLogoUri';
import { StandingList } from './StandingList';

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
                customColor={ index < 3 ? 'primaryAccent' : 'white'}
            />
        ))
    );

    return (
        <Flex
            sx={{
                [mq[1]]: {
                    flexDirection: 'column',
                    width: '100%',
                },
            }}
        >
            <Box
               sx={{
                   flexGrow: 1,
                   [mq[1]]: {
                       flexDirection: 'column',
                       paddingRight: 0,
                   },
               }}
                paddingRight={2}
            >
                <StandingList header='Central' minHeight={'14.55em'}>
                    <Box>
                        {renderTeams(teamStandings.central)}
                    </Box>
                </StandingList>
                <StandingList header='Pacific' >
                    <Box>
                        {renderTeams(teamStandings.pacific)}
                    </Box>
                </StandingList>
                <StandingList header='Western' >
                    <Box>
                        {renderTeams(teamStandings.western)}
                    </Box>
                </StandingList>

            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    [mq[1]]: {
                        flexDirection: 'column',
                        paddingLeft: 0,
                    },
                }}
                paddingLeft={2}
            >
                <StandingList header='Metropolitan' >
                    <Box>
                        {renderTeams(teamStandings.metropolitan)}
                    </Box>
                </StandingList>
                <StandingList header='Atlantic' >
                    <Box>
                        {renderTeams(teamStandings.atlantic)}
                    </Box>
                </StandingList>
                <StandingList header='Eastern' >
                    <Box>
                        {renderTeams(teamStandings.eastern)}
                    </Box>
                </StandingList>
            </Box>
        </Flex>
    );
});
