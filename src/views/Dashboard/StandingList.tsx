import React from 'react';
import { Box, Text } from 'rebass';

export const StandingList: React.FC<{ header: string; minHeight?: string }> = ({ children, header, minHeight = 'auto'}) => {
    return (
        <Box bg='level1' p={3} my={3} minHeight={minHeight}>
            <StandingsText>{header}</StandingsText>
            {children}
        </Box>
    );
};

const StandingsText: React.FC = ({ children }) => (
    <Text marginBottom={3} color='secondaryText'>{children}</Text>
);
