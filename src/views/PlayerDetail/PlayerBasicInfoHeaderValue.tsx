import React from 'react';
import styled from 'styled-components';

interface PlayerBasicInfoHeaderValueProps {
    header: string;
    value: string;
}

export const PlayerBasicInfoHeaderValue: React.FC<PlayerBasicInfoHeaderValueProps> = ({ header, value }) => {

    return (
        <Container>
            <Header>{header}</Header>
            <Value>{value}</Value>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.h6`
    margin: 0;
`;

const Value = styled.div`

`;
