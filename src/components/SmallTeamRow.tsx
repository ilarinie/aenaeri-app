
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Image, Link as RebassLink, Text } from 'rebass';

interface SmallTeamRowProps {
    mainText: string;
    statistic: string;
    statisticNominator?: string;
    index: number;
    logoUri: string;
    link: string;
    finnish?: boolean;
    customColor?: string;
    bg?: string;
}

export const SmallTeamRow = React.memo<SmallTeamRowProps>(({ logoUri, mainText, statistic, index, link, statisticNominator, finnish = false, customColor = 'white', bg = ''}) => {

    return (
        <Flex
            py={2}
            px={2}
            alignItems='center'
            justifyContent='flex-start'
            width='100%'
            height='1.3em'
            sx={{
                letterSpacing: '1px',
            }}
            bg={bg}
        >
            <Box
                sx={{ minWidth: '1em'}}
            >
                <Text>
                    {index}.
                </Text>
            </Box>
            <Image mx={1} sx={{ minWidth: '1em'}} src={logoUri} variant='avatar' height='200%' />
            <Flex
                alignItems='center'
                sx={{ flexGrow: 1, fontVariant: 'small-caps', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'lowercase'}}
                overflow='hidden'
                color={customColor}
            >
                <RebassLink
                    color={customColor}
                    as={Link}
                    // @ts-ignore
                    to={link}
                    sx={{
                        textDecoration: 'none',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {mainText}
                </RebassLink>
                {finnish && <Image height='0.3em' mx={1} src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg' />}
            </Flex>
            <Flex
                justifyContent='flex-end'
            >
                <Box
                     sx={{
                         flexGrow: 2,
                     }}
                >
                    <Text
                        textAlign='right'
                    >
                        {statistic}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
});
