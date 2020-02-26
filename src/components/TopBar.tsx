import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Link as RebassLink, Text } from 'rebass';
import { PlayerBaseDataResponse, TeamBaseDataResponse } from '../../server/models/BaseDataResponse';
import { ROOT_ROUTE } from '../routes';

interface TopBarProps {
    players: PlayerBaseDataResponse;
    teams: TeamBaseDataResponse;
    navigate: (path: string) => void;
}
export const TopBar: React.FC<TopBarProps> = ({ players, teams, navigate }) => {

    // @ts-ignore
    return (
        <Flex
            height='3em'
            alignItems='center'
            px={4}
            bg='level1'
            marginBottom={3}
        >
            <Text
                fontWeight='bold'
                onClick={() => navigate(ROOT_ROUTE)}
            >
                NHL APP
            </Text>
            <Box mx='auto' />

            <RebassLink
                variant='nav'
                as={Link}
                // @ts-ignore
                to='/account' selected={window.location.href.includes('/account')}>
                profile
            </RebassLink>
            <RebassLink
                variant='nav'
                as={Link}
                // @ts-ignore
                to='/nhl-stats' selected={window.location.href.includes('/nhl-stats')}>
                nhl standings
            </RebassLink>
        </Flex>
    );
};
