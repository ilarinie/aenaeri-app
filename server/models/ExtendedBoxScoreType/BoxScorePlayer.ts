export interface BoxScorePlayer {
    person: {
        id: number;
        fullName: string;
        link: string;
        shootsCatches: string;
        rosterStatus: string;
    };
    jerseyNumber: string;
    position: {
        code: string | 'N/A';
        name: string | 'Unknown';
        type: string | 'Unknown';
        abbreviation: string;
    };
    stats: {
        skaterStats?: {
            timeOnIce: string;
            assists: number;
            goals: number;
            shots: number;
            hits: number;
            powerPlayGoals: number;
            powerPlayAssists: number;
            penaltyMinutes: number;
            faceOffWins: number;
            faceoffTaken: number;
            takeaways: number;
            giveaways: number;
            shortHandedGoals: number;
            shortHandedAssists: number;
            blocked: number;
            plusMinus: number;
            evenTimeOnIce: string;
            powerPlayTimeOnIce: string;
            shortHandedTimeOnIce: string;
        };
        goalieStats?: {
            timeOnIce: string;
            assists: number;
            goals: number;
            pim: number;
            shots: number;
            saves: number;
            powerPlaySaves: number;
            shortHandedSaves: number;
            evenSaves: number;
            shortHandedShotsAgainst: number;
            evenShotsAgainst: number;
            powerPlayShotsAgainst: number;
            decision: string;
            savePercentage: number;
            powerPlaySavePercentage: number;
            evenStrengthSavePercentage: number;
        };
    };
}
