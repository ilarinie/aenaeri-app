import React from 'react';
import styled from 'styled-components';

interface SmallTeamRowProps {
    mainText: string;
    statistic: number;
    index: number;
    logoUri: string;
}

export const SmallTeamRow = React.memo<SmallTeamRowProps>(({ logoUri, mainText, statistic, index }) => {

    return (
        <TeamRowContainer>
            <Index>{index}.</Index>
            <TeamLogo src={logoUri} />
            <TeamName>{mainText}</TeamName>
            <div style={{ fontFamily: 'monospace'}}>{statistic}</div>
        </TeamRowContainer>
    );
});

const Index = styled.div`
    width: 1em;
    font-size: 8px;
    font-weight: 600;
`;

const TeamName = styled.div`
    font-weight: 500;
    text-transform: lowercase;
    font-variant: small-caps;
    letter-spacing: 2px;
    margin-right: auto;
    line-height: 15px;
    margin-bottom: 0.2em;
`;

const TeamRowContainer = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    justify-content: flex-start;
    height: 17px;
    padding: 0 0.5em;
`;

const TeamLogo = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 0.5em;
`;
