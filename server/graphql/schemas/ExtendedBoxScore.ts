import { gql } from 'apollo-server-express';

export const Exasd = gql`

    type MetaDataType {
        wait: Int
        timestamp: String
    }


    type GameDataGameType {
        pk: Int
        season: String
        type: String
    }

    type GameDataDatetimeType {
        dateTime: String
        endDateTime: String
    }

    type GameDataStatusType {
        abstractGameState: String
        codedGameState: String
        detailedState: String
        statusCode: String
        startTimeTBD: Boolean
    }

    type GameDataTeamsType {
        away: GameDataTeamsTeamType
        home: GameDataTeamsTeamType
    }

    type GameDataTeamsTeamType {
        id: Int
        name: String
        link: String
        venue: GameDataTeamsTeamTypeVenue
        abbreviation: String
        triCode: String
        teamName: String
        locationName: String
        firstYearOfPlay: String
        division: GameDataTeamsTeamTypeDivision
        conference: GameDataTeamsTeamTypeConfrence
        franchise: GameDataTeamsTeamTypeFranchise
        shortName: String
        officialSiteUrl: String
        franchiseId: Int
        active: Boolean
    }

    type GameDataTeamsTeamTypeVenue {
        id: Int
        name: String
        link: String
        city: String
        timeZone: GameDataTeamsTeamTypeVenueTimeZone
    }

    type GameDataTeamsTeamTypeVenueTimeZone {
        id: String
        offset: Int
        tz: String
    }

    type GameDataTeamsTeamTypeFranchise {
        franchiseId: Int
        teamName: String
        link: String
    }

    type GameDataTeamsTeamTypeConfrence {
        id: Int
        name: String
        link: String
    }

    type GameDataTeamsTeamTypeDivision {
        id: Int
        name: String
        nameShort: String
        link: String
        abbreviation: String
    }

    type GameDataPlayerType {
        id: Int
        fullName: String
        link: String
        firstName: String
        lastName: String
        primaryNumber: String
        birthDate: String
        currentAge: Int
        birthCity: String
        birthStateProvince: String
        birthCountry: String
        nationality: String
        height: String
        weight: Int
        active: Boolean
        alternateCaptain: Boolean
        captain: Boolean
        rookie: Boolean
        shootsCatches: String
        rosterStatus: String
        currentTeam: GameDataPlayerTypeCurrentTeam
        primaryPosition: GameDataPlayerTypePrimaryPosition
    }

    type GameDataPlayerTypeCurrentTeam {
        id: Int
        name: String
        link: String
        triCode: String
    }

    type GameDataPlayerTypePrimaryPosition {
        code: String
        name: String
        type: String
        abbreviation: String
    }

    type GameDataVenueType {
        name: String
        link: String
    }

    type GameDataType {
        game: GameDataGameType
        datetime: GameDataDatetimeType
        status: GameDataStatusType
        teams: GameDataTeamsType
        players: [GameDataPlayerType]
        venue: GameDataVenueType
    }

    type OddsType {
        homeOdds: Float
        awayOdds: Float
        drawOdds: Float
        updatedAt: String
        gameName: String
        source: String
        bookMakerId: String
    }



    type LiveData {
        name: String
        boxscore: BoxScore
    }

    type ExtendedBoxScore {
        copyright: String
        gamePk: ID
        link: String
        metadata: MetaDataType
        gameData: GameDataType
        liveData: LiveData
        odds(gameNames: [String]): [OddsType]
    }

    type Query {
        boxScores(from: String, to: String): [ExtendedBoxScore]
    }

`;

// liveData: {
//     plays: {
//         allPlays: Array<{
//             result: {
//                 event: string;
//                 eventCode: string;
//                 eventTypeId: string;
//                 description: string;
//             },
//             about: {
//                 eventIdx: number;
//                 eventId: number;
//                 period: number;
//                 periodType: string;
//                 ordinalNum: string;
//                 periodTime: string;
//                 periodTimeRemaining: string;
//                 dateTime: string;
//                 goals: {
//                     away: number;
//                     home: number;
//                 }
//             },
//             coordinates: {
//                 x?: number;
//                 y?: number;
//             };
//         } |
//         {
//             players: Array<{
//                 player: {
//                     id: number;
//                     fullName: string;
//                     link: string;
//                 };
//                   /**
//                    * ex: WINNER / LOSER; SCORER / ASSIST
//                    */
//                 playerType: string;
//             }>;
//             result: {
//                 event: string;
//                 eventCode: string;
//                 eventTypeId: string;
//                 description: string;
//                 secondaryType?: string;
//                 strength?: {
//                     code: string;
//                     name: string;
//                 },
//                 gameWinningGoal?: boolean;
//                 emptyNet?: boolean;
//             };
//             about: {
//                 eventIdx: number;
//                 eventId: number;
//                 period: number;
//                 periodType: string;
//                 ordinalNum: string;
//                 periodTime: string;
//                 periodTimeRemaining: string;
//                 dateTime: string;
//                 goals: {
//                     away: number;
//                     home: number;
//                 };
//             };
//             coordinates: {
//                 x: number;
//                 y: number;
//             };
//             team: {
//                 id: number;
//                 name: string;
//                 link: string;
//                 triCode: string;
//             };
//         }>;
//         /**
//          * eventIdx
//          */
//         scoringPlays: number[];
//         /**
//          * eventIdx
//          */
//         penaltyPlays: number[];
//         playsByPeriod: Array<{
//             startIndex: number;
//             plays: number[];
//             endIndex: number;
//         }>
//     };
//     lineScore?: {
//         currentPeriod: number;
//         currentPeriodOrdinal: string;
//         currentPeriodTimeRemaining: string;
//         periods?: Array<{
//             periodType: string;
//             /** real timestamp */
//             startTime: string;
//             /** real timestamp */
//             endTime: string;
//             num: number;
//             ordinalNum: string;
//             home: {
//                 goals: number;
//                 shotsOnGoal: number;
//                 rinkSide: string;
//             };
//             away: {
//                 goals: number;
//                 shotsOnGoal: number;
//                 rinkSide: string;
//             }
//         }>;
//         shootoutInfo: {
//             away: {
//                 scores: number;
//                 attempts: number;
//             };
//             home: {
//                 scores: number;
//                 attempts: number;
//             };
//         };
//         teams: {
//             home: LineScoreTeam;
//             away: LineScoreTeam;
//         };
//         powerPlayStrength: string;
//         hasShootout: boolean;
//         intermissionInfo: {
//             intermissionTimeRemaining: number;
//             intermissionTimeElapsed: number;
//             inIntermission: boolean;
//         };
//         powerPlayInfo: {
//             situationTimeRemaining: number;
//             situationTimeElapsed: number;
//             inSituation: boolean;
//         };
//     };
//     boxscore: {
//         teams: {
//             away: BoxScoreTeam;
//             home: BoxScoreTeam;
//         }
//         officials: Array<{
//             official: {
//                 id: number;
//                 fullName: string;
//                 link: string;
//             },
//             officialType: string;
//         }>;
//     };
//     decisions?: {
//         winner: {
//             id: number;
//             fullName: string;
//             link: string;
//         };
//         loser: {
//             id: number;
//             fullName: string;
//             link: string;
//         };
//         firstStar: {
//             id: number;
//             fullName: string;
//             link: string;
//         };
//         secondStar: {
//             id: number;
//             fullName: string;
//             link: string;
//         };
//         thirdStar: {
//             id: number;
//             fullName: string;
//             link: string;
//         };
//     };
// };
