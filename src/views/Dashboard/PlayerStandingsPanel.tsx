import React from 'react';
import styled from 'styled-components';
import { PlayerStandings, SeasonStatsObject } from '../../../server/models/BaseDataResponse';
import { GoalieSingleSeasonStats } from '../../../server/models/GoalieSingleSeasonStats';
import { Player } from '../../../server/models/Player';
import { SkaterSingleSeasonStats } from '../../../server/models/SkaterSingleSeasonStats';
import { BoxHeader } from '../../components/BoxHeader';
import { SmallTeamRow } from '../../components/SmallTeamRow';
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
        return playerIds.slice(1, 7).map((playerId, index) => {
            const player = playerObject[playerId.toString()];
            let stat;
            if (!goalie) {
                 stat = skaterStats[playerId.toString()].statObject['20192020'][statName as keyof SkaterSingleSeasonStats] as number;
            } else {
                 stat = goalieStats[playerId.toString()].statObject['20192020'][statName as keyof GoalieSingleSeasonStats] as number;
            }
            return (
                <SmallTeamRow
                    key={playerId}
                    logoUri={playerThumbnailUrlFromPlayerId(player.id.toString())}
                    statistic={stat}
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
                {renderPlayerList(playerStandings.points, 'points', false)}
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='1 / 1' gridColumn='2 / 2'>
                <BoxHeader>Assists</BoxHeader>
                {renderPlayerList(playerStandings.assists, 'assists', false)}
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='2 / 2' gridColumn='1 / 1'>
                <BoxHeader>Goals</BoxHeader>
                {renderPlayerList(playerStandings.goals, 'goals', false)}
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='2 / 2' gridColumn='2 / 2'>
                <BoxHeader>Finnish players</BoxHeader>
                {renderPlayerList(playerStandings.finnishPlayers, 'points', false)}
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='3 / 3' gridColumn='1 / 1'>
                <BoxHeader>Save PCT</BoxHeader>
                {renderPlayerList(playerStandings.savePct, 'savePercentage', true)}
            </PlayerStandingsListContainer>
            <PlayerStandingsListContainer gridRow='3 / 3' gridColumn='2 / 2'>
                <BoxHeader>GAA</BoxHeader>
                {renderPlayerList(playerStandings.gaa, 'goalAgainstAverage', true)}
            </PlayerStandingsListContainer>
        </PlayerStandingsPanelContainer>
    );
};

const PlayerStandingsListContainer = styled.div<{ gridRow: string, gridColumn: string}>`
    grid-row: ${(props) => props.gridRow};
    grid-column: ${(props) => props.gridColumn};
    margin-right: 0.5em;
    padding-bottom: 0.5em;
`;

const PlayerStandingsPanelContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0.5em;
`;
