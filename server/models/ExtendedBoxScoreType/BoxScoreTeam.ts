import { BoxScorePlayer } from './BoxScorePlayer';
export interface BoxScoreTeam {
    team: {
        id: number;
        name: string;
        link: string;
        abbreviation: string;
        triCode: string;
    };
    teamStats: {
        teamSkaterStats: {
            goals: number;
            pim: number;
            shots: number;
            powerPlayPercentage: string;
            powerPlayGoals: number;
            powerPlayOpportunities: number;
            faceOffWinPercentage: string;
            blocked: number;
            takeaways: number;
            giveaways: number;
            hits: number;
        };
    };
    players: {
        /**
         * Id in format "ID<playerId>"
         */
        [id: string]: BoxScorePlayer;
    };
    goalies: number[];
    skaters: number[];
    onIce: number[];
    onIcePlus: Array<{
        playerId: number;
        shiftDuration: number;
        stamina: number;
    }>;
    scratches: number[];
    penaltyBox: number[];
    coaches: Array<{
        person: {
            fullName: string;
            link: string;
        };
        position: {
            code: string;
            name: string;
            type: string;
            abbreviation: string;
        };
    }>;
}
