export interface GoalieSingleSeasonStats {
    season: string;
    playerId: number;
    timeOnIce: string;
    ot: number;
    shutouts: number;
    ties: number;
    wins: number;
    losses: number;
    saves: number;
    powerPlaySaves: number;
    shortHandedSaves: number;
    evenSaves: number;
    shortHandedShots: number;
    evenShots: number;
    powerPlayShots: number;
    savePercentage: number;
    goalAgainstAverage: number;
    games: number;
    gamesStarted: number;
    shotsAgainst: number;
    goalsAgainst: number;
    timeOnIcePerGame: string;
    powerPlaySavePercentage: number;
    shortHandedSavePercentage: number;
    evenStrengthSavePercentage: number;
}
