import React from 'react';
import { ExtendedBoxScore } from '../../../server/models/ExtendedBoxScoreType';
import styled from 'styled-components';
import { getTeamLogoUri } from '../../utils/teamLogoUri';
import { GameDatePanel } from './GameDatePanel';
import { useSelector } from 'react-redux';
import { Team } from '../../../server/models/Team';
import { SeasonStatsObject } from '../../../server/models/BaseDataResponse';
import { TeamSingleSeasonStats } from '../../../server/models/TeamSingleSeasonStats';


export const NextGameItem: React.FC<{ game: ExtendedBoxScore; teamsStats?: SeasonStatsObject<TeamSingleSeasonStats>, width?: string }> = ({ game, teamsStats, width = '300px' }) => {
    
    let homeRecord = '10-20-23';
    const homeStats = teamsStats ? teamsStats[game.gameData.teams.home.id].statObject['20192020'] : null;
    if (homeStats) {
        homeRecord = `${homeStats.wins}-${homeStats.losses}-${homeStats.ot}`
    }

    let awayRecord = '30-23-12';
    const awayStats = teamsStats ? teamsStats[game.gameData.teams.away.id].statObject['20192020'] : null;
    if (awayStats) {
        awayRecord = `${awayStats.wins}-${awayStats.losses}-${awayStats.ot}`
    }
    
    
    return (
        <Container style={{ width }}>
            <GameDatePanel date={new Date(game.gameData.datetime.dateTime)} />
            <TeamLogo column="1 / 1" src={getTeamLogoUri(game.gameData.teams.away.id.toString())} />
            <VSDiv>VS</VSDiv>
            <TeamLogo column="3 / 3" src={getTeamLogoUri(game.gameData.teams.home.id.toString())} />
            <Odds>
                <StatContainer style={{ gridColumn: '1 /1', gridRow: '3 / 3' }}>
                    {homeRecord}
                </StatContainer>
                <StatContainer style={{ gridColumn: '2 /2', gridRow: '3 / 3' }}>
                    
                </StatContainer>
                <StatContainer style={{ gridColumn: '3 /3', gridRow: '3 / 3' }}>
                    {awayRecord}
                </StatContainer>
            </Odds>
            {game.odds &&
                <Odds>
                    <OddContainer style={{ gridColumn: '1 /1', gridRow: '3 / 3' }}>
                        <div>1</div>
                        {(game.odds.awayOdds / 100).toFixed(2)}
                    </OddContainer>
                    <OddContainer style={{ gridColumn: '2 /2', gridRow: '3 / 3' }}>
                        <div>
                            X
                        </div>
                        {(game.odds.drawOdds / 100).toFixed(2) }
                    </OddContainer>
                    <OddContainer style={{ gridColumn: '3 /3', gridRow: '3 / 3' }}>
                        <div>2</div>
                        {(game.odds.homeOdds / 100).toFixed(2)}
                    </OddContainer>
                </Odds>
            }
        </Container>

    )

}

const StatContainer = styled.div`
    font-size: 0.8rem;
`;

const OddContainer = styled.div`
    div {
        font-size: 0.5rem;
    }
    border: 1px solid white;
    width: 50%;
    margin: 0 auto;
    padding: 0.5em 0.5em;
    text-aling: center;

`

const Odds = styled.div`
    grid-column: 1 / 5;
    text-align: center;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
` 



const TeamLogo = styled.img<{ column: string }>`
    grid-column: ${props => props.column};
    grid-row: 2 / 2;
`


const VSDiv = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 2rem;
    grid-row: 2 / 2 ;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid white;
    padding: 1em;

`