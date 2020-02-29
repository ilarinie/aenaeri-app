import * as mongoose from 'mongoose';
import { BoxScoreTeamSchema } from './BoxScoreTeamSchema';
import { GameDataPlayer } from "../../models/ExtendedBoxScoreType/GameDataPlayer";
import { GameDataTeam } from "../../models/ExtendedBoxScoreType/GameDataTeam";
import { BoxScoreTeam } from "../../models/ExtendedBoxScoreType/BoxScoreTeam";
import { LineScoreTeam } from "../../models/ExtendedBoxScoreType/LineScoreTeam";
import { GameDataPlayerSchema } from './GameDataPlayerSchema';
import { GameDataTeamSchema } from './GameDataTeamSchema';
import { LineScorePeriodSchema } from './LineScorePeriodSchema';
import { LineScoreTeamSchema } from './LineScoreTeamSchema';
import { SchemaTypes } from 'mongoose';
import { GameOddsAndResultsSchema, GameOddsAndResults } from './GameOddsAndResultsSchema';

const ExtendedBoxScoreSchema = new mongoose.Schema<ExtendedBoxScoreSchemaType>({
    copyright: String,
    gamePk: { type: Number, index: true, unique: true },
    link: String,
    metadata: {
        wait: Number,
        /**
         * ex. "20181005_182112"
         */
        timestamp: String,
    },
    gameData: {
        game: {
            pk: Number,
            season: String,
            type: SchemaTypes.Mixed,
        },
        datetime: {
            /**
             * timestamp of game start
             */
            dateTime: Date,
            /**
             * timestamp of game end
             */
            endDateTime: { type: Date, nullable: true },
        },
        status: {
            /**
             * Final for finished games
             */
            abstractGameState: { type: String, index : true },
            codedGameState: String,
            detailedState: String,
            statusCode: String,
            startTimeTBD: Boolean,
        },
        teams: {
            away: GameDataTeamSchema,
            home: GameDataTeamSchema,
        },
        players: [GameDataPlayerSchema],
        venue: {
            name: String,
            link: String,
        },
    },
    liveData: {
        plays: {
            allPlays: [SchemaTypes.Mixed],
            /**
             * eventIdx
             */
            scoringPlays: [Number],
            /**
             * eventIdx
             */
            penaltyPlays: [Number],
            playsByPeriod: [SchemaTypes.Mixed],
        },
        lineScore: {
            currentPeriod: Number,
            currentPeriodOrdinal: String,
            currentPeriodTimeRemaining: String,
            periods: [LineScorePeriodSchema],
            shootoutInfo: {
                away: {
                    scores: Number,
                    attempts: Number,
                },
                home: {
                    scores: Number,
                    attempts: Number,
                },
            },
            teams: {
                home: LineScoreTeamSchema,
                away: LineScoreTeamSchema,
            },
            powerPlayStrength: String,
            hasShootout: Boolean,
            intermissionInfo: {
                intermissionTimeRemaining: Number,
                intermissionTimeElapsed: Number,
                inIntermission: Boolean,
            },
            powerPlayInfo: {
                situationTimeRemaining: Number,
                situationTimeElapsed: Number,
                inSituation: Boolean,
            },
        },
        boxscore: {
            teams: {
                away: BoxScoreTeamSchema,
                home: BoxScoreTeamSchema,
            },
            officials: [SchemaTypes.Mixed],
        },
        decisions: {
            winner: {
                id: Number,
                fullName: String,
                link: String,
            },
            loser: {
                id: Number,
                fullName: String,
                link: String,
            },
            firstStar: {
                id: Number,
                fullName: String,
                link: String,
            },
            secondStar: {
                id: Number,
                fullName: String,
                link: String,
            },
            thirdStar: {
                id: Number,
                fullName: String,
                link: String,
            },
        },
    },
    odds: [GameOddsAndResultsSchema],

});

export interface ExtendedBoxScoreSchemaDocumentType extends ExtendedBoxScoreSchemaType, mongoose.Document {};

export interface ExtendedBoxScoreSchemaType {
    copyright: string;
    gamePk: number;
    link: string;
    metadata: {
        wait: number;
        /**
         * ex. "20181005_182112"
         */
        timestamp: string;
    };
    gameData: {
        game: {
            pk: number;
            season: string;
            type: string;
        },
        datetime: {
            /**
             * timestamp of game start
             */
            dateTime: Date;
            /**
             * timestamp of game end
             */
            endDateTime: Date;
        },
        status: {
            /**
             * Final for finished games
             */
            abstractGameState: string;
            codedGameState: string;
            detailedState: string;
            statusCode: string;
            startTimeTBD: boolean;
        },
        teams: {
            away: GameDataTeam,
            home: GameDataTeam,
        },
        players: GameDataPlayer[];
        venue: {
            name: string;
            link: string;
        },
    };
    liveData: {
        plays: {
            allPlays: any[],
            /**
             * eventIdx
             */
            scoringPlays: number[],
            /**
             * eventIdx
             */
            penaltyPlays: number[],
            playsByPeriod: any[],
        },
        lineScore: {
            currentPeriod: number;
            currentPeriodOrdinal: string;
            currentPeriodTimeRemaining: string;
            periods: any[],
            shootoutInfo: {
                away: {
                    scores: number;
                    attempts: number;
                },
                home: {
                    scores: number;
                    attempts: number;
                },
            },
            teams: {
                home: LineScoreTeam,
                away: LineScoreTeam,
            },
            powerPlayStrength: string;
            hasShootout: boolean;
            intermissionInfo: {
                intermissionTimeRemaining: number;
                intermissionTimeElapsed: number;
                inIntermission: boolean;
            },
            powerPlayInfo: {
                situationTimeRemaining: number;
                situationTimeElapsed: number;
                inSituation: boolean;
            },
        },
        boxscore: {
            teams: {
                away: BoxScoreTeam;
                home: BoxScoreTeam;
            },
            officials: any[];
        },
        decisions: {
            winner: {
                id: number;
                fullName: string;
                link: string;
            },
            loser: {
                id: number;
                fullName: string;
                link: string;
            },
            firstStar: {
                id: number;
                fullName: string;
                link: string;
            },
            secondStar: {
                id: number;
                fullName: string;
                link: string;
            },
            thirdStar: {
                id: number;
                fullName: string;
                link: string;
            },
        },
    };
    odds: GameOddsAndResults[];
}

export default mongoose.model<ExtendedBoxScoreSchemaDocumentType>('ExtendedBoxScore', ExtendedBoxScoreSchema);
