import React from 'react';
import styled from 'styled-components';
import { PlayerStandings, SeasonStatsObject } from '../../../server/models/BaseDataResponse';
import { GoalieSingleSeasonStats } from '../../../server/models/GoalieSingleSeasonStats';
import { Player } from '../../../server/models/Player';
import { SkaterSingleSeasonStats } from '../../../server/models/SkaterSingleSeasonStats';
import { BoxHeader } from '../../components/BoxHeader';
import { SmallTeamRow } from '../../components/SmallTeamRow';
import { PLAYERS_ROUTE } from '../../routes';
import { playerThumbnailUrlFromPlayerId } from '../../utils/playerThumbnailUrl';

interface PlayerStandingsPanelProps {
    playerObject: {
        [key: string]: Player,
    };
    skaterStats: SeasonStatsObject<SkaterSingleSeasonStats>;
    goalieStats: SeasonStatsObject<GoalieSingleSeasonStats>;
    playerStandings: PlayerStandings;
}

export const PlayerStandingsPanel: React.FC<PlayerStandingsPanelProps> = ({ playerObject, skaterStats, goalieStats, playerStandings }) => {

    const renderPlayerList = (playerIds: string[], statName: keyof SkaterSingleSeasonStats | keyof GoalieSingleSeasonStats, goalie: boolean) => {
        return playerIds.slice(0, 7).map((playerId, index) => {
            const player = playerObject[playerId.toString()];
            let stat;
            if (!goalie) {
                 stat = skaterStats[playerId.toString()].statObject['20192020'][statName as keyof SkaterSingleSeasonStats] as number;
            } else {
                 stat = goalieStats[playerId.toString()].statObject['20192020'][statName as keyof GoalieSingleSeasonStats] as number;
            }
            return (
                <SmallTeamRow
                    link={PLAYERS_ROUTE + playerId}
                    key={playerId}
                    logoUri={playerThumbnailUrlFromPlayerId(player.id.toString())}
                    statistic={stat.toString()}
                    statisticNominator={goalie ? goalieStats[playerId.toString()].statObject['20192020'].games + 'gp' : skaterStats[playerId.toString()].statObject['20192020'].games + 'gp'}
                    mainText={player.fullName}
                    index={index + 1}
                />
            );
        });
    };
    return (
        <PlayerStandingsPanelContainer>
            <PlayerStandingsListContainer gridRow='1 / 1' gridColumn='1 / 1'>
                <BoxHeader>Points</BoxHeader>
                <StandingsContainer rows={7}>
                    {renderPlayerList(playerStandings.points, 'points', false)}
                </StandingsContainer>
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='1 / 1' gridColumn='2 / 2'>
                <BoxHeader>Assists</BoxHeader>
                <StandingsContainer rows={7}>
                    {renderPlayerList(playerStandings.assists, 'assists', false)}
                </StandingsContainer>
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='2 / 2' gridColumn='1 / 1'>
                <BoxHeader>Goals</BoxHeader>
                <StandingsContainer rows={7}>
                    {renderPlayerList(playerStandings.goals, 'goals', false)}
                </StandingsContainer>
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='2 / 2' gridColumn='2 / 2'>
                <BoxHeader>Finnish players</BoxHeader>
                <StandingsContainer rows={7}>
                    {renderPlayerList(playerStandings.finnishPlayers, 'points', false)}
                </StandingsContainer>
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='3 / 3' gridColumn='1 / 1'>
                <BoxHeader>Save PCT</BoxHeader>
                <StandingsContainer rows={7}>
                    {renderPlayerList(playerStandings.savePct, 'savePercentage', true)}
                </StandingsContainer>
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='3 / 3' gridColumn='2 / 2'>
                <BoxHeader>GAA</BoxHeader>
                <StandingsContainer rows={7}>
                    {renderPlayerList(playerStandings.gaa, 'goalAgainstAverage', true)}
                </StandingsContainer>
            </PlayerStandingsListContainer>
        </PlayerStandingsPanelContainer>
    );
};

const StandingsContainer = styled.div<{ rows: number}>`
    min-height: calc( ${(props) => props.rows} * 19px);
    min-width: 100%;
    display: flex;
    flex-direction: column;
    max-height: calc( ${(props) => props.rows} * 19px);
`;

const PlayerStandingsListContainer = styled.div<{ gridRow: string, gridColumn: string}>`
    grid-row: ${(props) => props.gridRow};
    grid-column: ${(props) => props.gridColumn};
    margin-right: 0.5em;
`;

const PlayerStandingsPanelContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: calc(100% - 5em);
    grid-template-rows: 33% 33% 33%;
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    padding: 0.5em;
`;
