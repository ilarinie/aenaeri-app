import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Link as RebassLink, Text } from 'rebass';

export const StandingList: React.FC<{ header: string; minHeight?: string, to?: string }> = ({ children, header, minHeight = 'auto', to }) => {
    return (
        <Box bg='level1' p={3} my={3} minHeight={minHeight}>
            {!to &&
                <StandingsText>{header}</StandingsText>
            }
            {to &&
            <Box
                marginBottom={3}
            >
                <RebassLink
                    // @ts-ignore
                    to={to}
                    as={Link}
                    marginBottom={3}
                    color='secondaryText'
                >
                {header}
                </RebassLink>
            </Box>
            }
            {children}
        </Box>
    );
};

const StandingsText: React.FC = ({ children }) => (
    <Text marginBottom={3} color='secondaryText'>{children}</Text>
);
