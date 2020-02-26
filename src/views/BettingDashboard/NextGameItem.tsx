import React, { useEffect, useState } from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import { SeasonStatsObject } from '../../../server/models/BaseDataResponse';
import { ExtendedBoxScore } from '../../../server/models/ExtendedBoxScoreType';
import { TeamSingleSeasonStats } from '../../../server/models/TeamSingleSeasonStats';
import { getTeamLogoUri } from '../../utils/teamLogoUri';
import { GameDatePanel } from './GameDatePanel';
import { OddsRow } from './OddsRow';

export const NextGameItem: React.FC<{ game: ExtendedBoxScore; teamsStats?: SeasonStatsObject<TeamSingleSeasonStats>, width?: string }> = ({ game, teamsStats, width = '300px' }) => {

    const [ records, setRecords ] = useState({ home: '', away: ''});

    useEffect(() => {
        const record = { home: '', away: '' };
        const homeStats = teamsStats ? teamsStats[game.gameData.teams.home.id].statObject['20192020'] : null;
        if (homeStats) {
            record.home = `${homeStats.wins}-${homeStats.losses}-${homeStats.ot}`;
        }
        const awayStats = teamsStats ? teamsStats[game.gameData.teams.away.id].statObject['20192020'] : null;
        if (awayStats) {
            record.away = `${awayStats.wins}-${awayStats.losses}-${awayStats.ot}`;
        }
        setRecords({
            home: record.home || '12-32-23',
            away: record.away || '12-43-34',
        });
    }, [teamsStats, game]);

    const oneXTwoOdds = game.odds.filter((o) => o.gameName === '1X2');

    const oneTwoOdds = game.odds.filter((o) => o.gameName === '12');

    return (
        <Box
            width={width}
            backgroundColor='level1'
            p={2}
            marginRight={2}
        >
            <GameDatePanel date={new Date(game.gameData.datetime.dateTime)} />
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                    <TeamLogo src={getTeamLogoUri(game.gameData.teams.home.id.toString())} />
                    <StatContainer >
                        {records.home}
                    </StatContainer>
                </div>
                <VSDiv>VS</VSDiv>
                <div>
                    <TeamLogo src={getTeamLogoUri(game.gameData.teams.away.id.toString())} />
                    <StatContainer>
                        {records.away}
                    </StatContainer>
                </div>
            </div>
            <h3>1X2</h3>
            {oneXTwoOdds.map((odds) => (
                <OddsRow key={odds.bookMakerId} odds={odds} />
            ))}
            <h3>12</h3>
            {oneTwoOdds.map((odds) => (
                <OddsRow key={odds.bookMakerId} odds={odds} />
            ))}
        </Box>

    );

};

const StatContainer = styled.div`
    font-size: 0.8rem;
    height: 20px;
    margin-top: 0.2em;
`;

const TeamLogo = styled.img`
    display: block;
    min-width: 125px;
    max-height: 125px;
`;

const VSDiv = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
    grid-row: 2 / 2 ;
`;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   text-align: center;
   box-sizing: border-box;
   background: var(--semi-dark-gray);
   margin: 0.5em 0.5em;
   padding: 0.5em;
`;
