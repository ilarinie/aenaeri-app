import { formatDistanceStrict } from 'date-fns';
import { format } from 'date-fns';
import React from 'react';
import { Box, Flex, Text } from 'rebass';

export const GameDatePanel = React.memo<{ date: Date }>(({date}) => (
    <Flex
        sx={{
            letterSpacing: '1px',
        }}
        my={3}
    >
        <Text mx={2} fontSize='1.3em' >
            In {formatDistanceStrict(date, new Date())}
        </Text>
        <Box mx={2} sx={{ borderLeft: '1px solid white'}} />
        <Text mx={2} fontSize='1.3em'>
            {format(date, 'HH:mm')}
        </Text>
    </Flex>
));
