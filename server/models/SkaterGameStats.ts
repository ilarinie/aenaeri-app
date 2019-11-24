import { GameStats } from './GameStats';

export interface SkaterGameStats extends GameStats, SkaterNumericGameStats {
    timeOnIce: string;
    powerPlayTimeOnIce: string;
    evenTimeOnIce: string;
    penaltyMinutes: string;
    shotPct: number;
    shortHandedTimeOnIce: string;
}

export interface SkaterNumericGameStats {
    assists: number;
    goals: number;
    pim: number;
    shots: number;
    games: number;
    hits: number;
    powerPlayGoals: number;
    powerPlayPoints: number;
    gameWinningGoals: number;
    overTimeGoals: number;
    shortHandedGoals: number;
    shortHandedPoints: number;
    blocked: number;
    plusMinus: number;
    points: number;
    shifts: number;
}
