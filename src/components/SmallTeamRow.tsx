import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SmallTeamRowProps {
    mainText: string;
    statistic: string;
    statisticNominator?: string;
    index: number;
    logoUri: string;
    link: string;
}

export const SmallTeamRow = React.memo<SmallTeamRowProps>(({ logoUri, mainText, statistic, index, link, statisticNominator }) => {

    return (
        <TeamRowContainer>
            <Index>{index}.</Index>
            <TeamLogo src={logoUri} />
            <TeamName><Link to={link}>{mainText}</Link></TeamName>
            <div style={{ fontFamily: 'monospace'}}>{statistic}{statisticNominator && ' / ' + statisticNominator}</div>
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
    line-height: 16px;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    a {
        color: inherit;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
`;

const TeamRowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 0.5em;
    &:nth-child(odd) {
        background: #1E1E1E;
    }
`;

const TeamLogo = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 0.5em;
`;
