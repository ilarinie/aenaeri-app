import React from 'react';
import { Box, Flex } from 'rebass';
import { PlayerStandings, SeasonStatsObject } from '../../../server/models/BaseDataResponse';
import { GoalieSingleSeasonStats } from '../../../server/models/GoalieSingleSeasonStats';
import { Player } from '../../../server/models/Player';
import { SkaterSingleSeasonStats } from '../../../server/models/SkaterSingleSeasonStats';
import { SmallTeamRow } from '../../components/SmallTeamRow';
import { PLAYERS_ROUTE } from '../../routes';
import { mq } from '../../theme';
import { getTeamLogoUri } from '../../utils/teamLogoUri';
import { StandingList } from './StandingList';

interface PlayerStandingsPanelProps {
    playerObject: {
        [key: string]: Player,
    };
    skaterStats: SeasonStatsObject<SkaterSingleSeasonStats>;
    goalieStats: SeasonStatsObject<GoalieSingleSeasonStats>;
    playerStandings: PlayerStandings;
}

export const PlayerStandingsPanel: React.FC<PlayerStandingsPanelProps> = ({ playerObject, skaterStats, goalieStats, playerStandings }) => {

    const renderPlayerList = (playerIds: string[], statName: keyof SkaterSingleSeasonStats | keyof GoalieSingleSeasonStats, goalie: boolean, fixed: number = 0) => {
        return playerIds.slice(0, 7).map((playerId, index) => {
            const player = playerObject[playerId.toString()];
            let stat;
            if (!goalie) {
                stat = skaterStats[playerId.toString()].statObject['20192020'][statName as keyof SkaterSingleSeasonStats];
            } else {
                stat = goalieStats[playerId.toString()].statObject['20192020'][statName as keyof GoalieSingleSeasonStats];
            }
            return (
                <SmallTeamRow
                    link={PLAYERS_ROUTE + playerId}
                    key={playerId}
                    logoUri={
                        getTeamLogoUri(player.teamId.toString())
                    }
                    statistic={parseFloat(stat as any).toFixed(fixed).toString()}
                    statisticNominator={goalie ? goalieStats[playerId.toString()].statObject['20192020'].games.toString() : skaterStats[playerId.toString()].statObject['20192020'].games.toString()}
                    mainText={player.fullName}
                    index={index + 1}
                    finnish={player.nationality === 'FIN'}
                    bg={index % 2 != 0  ? 'level1' : 'level2'}
                />
            );
        });
    };
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
                        paddingRight: 0,
                    },
                }}
                paddingRight={2}
            >
                <StandingList header='Points'>
                    <Box>
                        {renderPlayerList(playerStandings.points, 'points', false)}
                    </Box>
                </StandingList>
                <StandingList header='Assists'>
                    <Box>
                        {renderPlayerList(playerStandings.assists, 'assists', false)}
                    </Box>
                </StandingList>
                <StandingList header='Goals'>
                    <Box>
                        {renderPlayerList(playerStandings.goals, 'goals', false)}
                    </Box>
                </StandingList>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    [mq[1]]: {
                        paddingLeft: 0,
                    },
                }}
                paddingLeft={2}
            >
                <StandingList header='Finnish skaters' to='finnish'>
                    <Box>
                        {renderPlayerList(playerStandings.finnishPlayers, 'points', false)}
                    </Box>
                </StandingList>
                <StandingList header='Save PCT' >
                    <Box>
                        {renderPlayerList(playerStandings.savePct, 'savePercentage', true, 3)}
                    </Box>
                </StandingList>
                <StandingList header='GAA'>
                    <Box>
                        {renderPlayerList(playerStandings.gaa, 'goalAgainstAverage', true, 2)}
                    </Box>
                </StandingList>
            </Box>
        </Flex>
    );
};

