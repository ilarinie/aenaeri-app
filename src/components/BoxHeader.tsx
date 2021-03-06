import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'rebass';
import styled from 'styled-components';

export const BoxHeader = React.memo(({ children }) => (
    <Text as={'h3'} textAlign='center'>
        {children}
    </Text>

));

// export const BoxHeader = styled.h3`
//     text-align: center;
//     line-height: 2em;
//     text-transform: uppercase;
//     font-variant: small-caps;
//     font-weight: 600;
//     letter-spacing: 2px;
//     margin-bottom: 0.2em;
//     margin-top: 0.2em;
// `;

export const BoxHeaderLink = styled(Link)`
    text-align: center;
    line-height: 2em;
    text-transform: uppercase;
    font-variant: small-caps;
    font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 0.2em;
    margin-top: 0.2em;
`;
