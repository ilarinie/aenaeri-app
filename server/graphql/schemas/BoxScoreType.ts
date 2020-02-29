import { gql } from 'apollo-server-express';

export const BoxScoreTypes = gql`
    type BoxScore {
         teams: BoxScoreTeams
         officials: [ BoxScoreOfficial ]
    }

    type BoxScoreTeams {
        away: BoxScoreTeam
        home: BoxScoreTeam
    }

    type BoxScoreTeamTeam {
        id: Int
        name: String
        link: String
        abbreviation: String
        triCode: String
    }

    type BoxScoreTeamStats {
        teamSkaterStats: BoxScoreTeamSkaterStats
    }

    type BoxScoreTeamSkaterStats {
        goals: Int
        pim: Float
        shots: Int
        powerPlayPercentage: String
        powerPlayGoals: Int
        powerPlayOpportunities: Int
        faceOffWinPercentage: String
        blocked: Int
        takeaways: Int
        giveaways: Int
        hits: Int
    }


    type BoxScoreTeam {
        team: BoxScoreTeamTeam
        teamStats: BoxScoreTeamStats
        # players: {
        #     /**
        #     * Id in format "ID<playerId>"
        #     */
        #     [id: string]: BoxScorePlayer;
        # };
        goalies: [Int]
        skaters: [Int]
        onIce: [Int]
        # onIcePlus: Array<{
        #     playerId: number;
        #     shiftDuration: number;
        #     stamina: number;
        # }>;
        scratches: [Int]
        penaltyBox: [Int]
        # coaches: Array<{
        #     person: {
        #         fullName: string;
        #         link: string;
        #     };
        #     position: {
        #         code: string;
        #         name: string;
        #         type: string;
        #         abbreviation: string;
        #     };
        # }>;

    }

    type BoxScoreOfficial {
        official: BoxScoreOfficialOfficial
        officialType: String
    }

    type BoxScoreOfficialOfficial {
        id: Int
        fullName: String
        link: String
    }


`;
