import { GameStats } from './GameStats';

export interface GoalieGameStats extends GameStats {
    timeOnIce: string;
    ot: number;
    shutouts: number;
    saves: number;
    powerPlaySaves: number;
    shortHandedSaves: number;
    evenSaves: number;
    shortHandedShots: number;
    evenShots: number;
    powerPlayShots: number;
    decision: 'W' | 'L';
    /**
     * Float
     */
    savePercentage: number;
    games: number;
    gamesStarted: number;
    shotsAgainst: number;
    goalsAgainst: number;
    /**
     * Decimal
     */
    powerPlaySavePercentage: number;
    /**
     * Decimal
     */
    shortHandedSavePercentage: number;
    /**
     * Decimal
     */
    evenStrengthSavePercentage: number;
    isHome: boolean;
    isWin: boolean;
    isOT: boolean;
}
