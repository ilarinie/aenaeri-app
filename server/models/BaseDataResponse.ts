import { Team } from './Team';

import { Player } from './Player';

import { SkaterSingleSeasonStats } from './SkaterSingleSeasonStats';

import { GoalieSingleSeasonStats } from './GoalieSingleSeasonStats';
import { TeamSingleSeasonStats } from './TeamSingleSeasonStats';

export interface TeamBaseDataResponse {
    teamList: string[];
    teamObject: {
        [key: string]: Team;
    };
}

export interface PlayerBaseDataResponse {
    playerList: string[];
    playerObject: {
        [key: string]: Player;
    };
}

export interface SeasonStatsObject<T> {
    [playerId: string]: {
        seasonList: string[];
        statObject: {
            [key: string]: T;
        }
    };
}

export interface BaseDataResponse {
    teams: TeamBaseDataResponse;
    players: PlayerBaseDataResponse;
    skaterStats: SeasonStatsObject<SkaterSingleSeasonStats>;
    goalieStats: SeasonStatsObject<GoalieSingleSeasonStats>;
    teamStats: SeasonStatsObject<TeamSingleSeasonStats>;
    playerStandings: PlayerStandings;
    teamStandings: TeamStandings;
}

export interface TeamStandings {
    nhl: string[];
    western: string[];
    eastern: string[];
    atlantic: string[];
    pacific: string[];
    central: string[];
    metropolitan: string[];
}

export interface PlayerStandings {
    /**
     * Top 30 goal scorers
     */
    goals: string[];
    /**
     * Top 30 in points
     */
    points: string[];
    /**
     * Top 30 in assists
     */
    assists: string[];
    /**
     * Finnish skaters sorted by points
     */
    finnishPlayers: string[];
    savePct: string[];
    gaa: string[];
    ppg: string[];
    gpg: string[];
}
