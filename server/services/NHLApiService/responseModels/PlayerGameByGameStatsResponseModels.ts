
export interface NHLApiSkaterGameByGameStatsResponse {
    copyright: string;
    stats: [
        {
            type: {
                displayName: string;
            };
            splits: [
                {
                    season: string;
                    stat: {
                        timeOnIce: string;
                        assists: number;
                        goals: number;
                        pim: number;
                        shots: number;
                        games: number;
                        hits: number;
                        powerPlayGoals: number;
                        powerPlayPoints: number;
                        powerPlayTimeOnIce: string;
                        evenTimeOnIce: string;
                        penaltyMinutes: string;
                        shotPct: number;
                        gameWinningGoals: number;
                        overTimeGoals: number;
                        shortHandedGoals: number;
                        shortHandedPoints: number;
                        shortHandedTimeOnIce: string;
                        blocked: number;
                        plusMinus: number;
                        points: number;
                        shifts: number;
                    }
                    team: {
                        id: number;
                        name: string;
                        link: string;
                    }
                    opponent: {
                        id: number;
                        name: string;
                        link: string;
                    }
                    date: string;
                    isHome: boolean;
                    isWin: boolean;
                    isOT: boolean;
                    game: {
                        gamePk: number;
                        link: string;
                        content: {
                            link: string;
                        }
                    }
                }
            ]
        }
    ];
}

export interface NHLApiGoalieGameByGameStatsResponse {
    copyright: string;
    stats: [
        {
            type: {
                displayName: string;
            };
            splits: [
                {
                    season: string;
                    stat: {
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
                    }
                    team: {
                        id: number;
                        name: string;
                        link: string;
                    }
                    opponent: {
                        id: number;
                        name: string;
                        link: string;
                    }
                    date: string;
                    isHome: boolean;
                    isWin: boolean;
                    isOT: boolean;
                    game: {
                        gamePk: number;
                        link: string;
                        content: {
                            link: string;
                        }
                    }
                }
            ]
        }
    ];
}

