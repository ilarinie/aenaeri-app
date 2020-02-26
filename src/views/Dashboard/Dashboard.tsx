import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Card, Flex, Text } from 'rebass';
import { RootState } from '../../state/rootReducer';
import { mq } from '../../theme';
import { PlayerStandingsPanel } from './PlayerStandingsPanel';
import { TeamStandingsPanel } from './TeamStandingsPanel';

export const Dashboard: React.FC<RouteComponentProps> = () => {

    const baseData = useSelector((state: RootState) => state.baseData);

    return (
        <Flex px={3} justifyContent='space-around'
            sx={{
                [mq[1]]: {
                    flexDirection: 'column',
                    padding: 0,
                },
            }}
        >
            <Card mx={2} px={2}
                sx={{
                    flexGrow: 1,
                    [mq[1]]: {
                        padding: 0,
                        margin: 0,
                    },
                }}
            >
                <Card my={2} py={2} >
                    <Text
                    as={'h3'}
                    sx={{
                        [mq[1]]: {
                            paddingLeft: '1em'
                        , },
                    }}
                    >
                        Player standings
                    </Text>
                </Card>
                <PlayerStandingsPanel
                    playerStandings={baseData.playerStandings}
                    goalieStats={baseData.goalieStats}
                    skaterStats={baseData.skaterStats}
                    playerObject={baseData.players.playerObject}
                />
            </Card>
            <Card
                mx={2}
                sx={{
                    flexGrow: 1,
                    [mq[1]]: {
                        padding: 0,
                        margin: 0,
                    },
                }} px={2}
            >
                    <Card my={2} py={2}>
                        <Text
                            as={'h3'}
                            sx={{
                                [mq[1]]: {
                                    paddingLeft: '1em'
                                , },
                            }}
                        >
                            Team standings
                        </Text>
                    </Card>
                    <TeamStandingsPanel
                        teamStandings={baseData.teamStandings}
                        teams={baseData.teams}
                        teamStats={baseData.teamStats}
                    />
                </Card>
            </Flex>
    );
};
