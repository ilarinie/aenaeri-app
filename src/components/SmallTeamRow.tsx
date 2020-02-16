
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

   const getFormattedNominator = () => {
       if (!statisticNominator) {
           return null;
       }
       if (statisticNominator.length < 4) {
           return <span> /&nbsp;&nbsp;{statisticNominator}</span>;
       }
       return <span> / {statisticNominator}</span>;
   };

   return (
        <TeamRowContainer>
            <Index>{index}.</Index>
            <TeamLogo src={logoUri} />
            <TeamName><Link to={link}>{mainText}</Link></TeamName>
            <div style={{ fontFamily: 'monospace'}}>{statistic}{getFormattedNominator()}</div>
        </TeamRowContainer>
    );
});

const Index = styled.div`
    width: 1em;
    font-size: 9px;
    font-weight: 600;
    margin-right: 0.5em;
    margin-left: -0.2em;
`;

const TeamName = styled.div`
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: auto;
    padding-top: 0.2em;
    font-size: 12px;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    a {
        color: inherit;
        text-decoration: none;
        text-overflow: ellipsis;
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
        background: var(--semi-light-gray);
    }
    height: 100%;
`;

const TeamLogo = styled.img`
    max-height: 1em;
    margin-right: 0.5em;
`;
