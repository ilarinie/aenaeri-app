
import { GameOddsAndResults } from '../GameOddsAndResults';
import { BoxScoreTeam } from './BoxScoreTeam';
import { GameDataPlayer } from './GameDataPlayer';
import { GameDataTeam } from './GameDataTeam';
import { LineScoreTeam } from './LineScoreTeam';

export interface ExtendedBoxScore {
    copyright: string;
    gamePk: number;
    link: string;
    metadata?: {
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
        };
        datetime: {
            /**
             * timestamp of game start
             */
            dateTime: Date;
            /**
             * timestamp of game end
             */
            endDateTime?: Date;
        };
        status: {
            /**
             * Final for finished games
             */
            abstractGameState: string;
            codedGameState: string;
            detailedState: string;
            statusCode: string;
            startTimeTBD: boolean;
        };
        teams: {
            away: GameDataTeam;
            home: GameDataTeam;
        };
        players: {
            /**
             * Player ID in format "ID<playerId>"
             */
            [id: string]: GameDataPlayer;
        };
        venue: {
            name: string;
            link: string;
        };
    };
    liveData: {
        plays: {
            allPlays: Array<{
                result: {
                    event: string;
                    eventCode: string;
                    eventTypeId: string;
                    description: string;
                },
                about: {
                    eventIdx: number;
                    eventId: number;
                    period: number;
                    periodType: string;
                    ordinalNum: string;
                    periodTime: string;
                    periodTimeRemaining: string;
                    dateTime: string;
                    goals: {
                        away: number;
                        home: number;
                    }
                },
                coordinates: {
                    x?: number;
                    y?: number;
                };
            } |
            {
                players: Array<{
                    player: {
                        id: number;
                        fullName: string;
                        link: string;
                    };
                      /**
                       * ex: WINNER / LOSER; SCORER / ASSIST
                       */
                    playerType: string;
                }>;
                result: {
                    event: string;
                    eventCode: string;
                    eventTypeId: string;
                    description: string;
                    secondaryType?: string;
                    strength?: {
                        code: string;
                        name: string;
                    },
                    gameWinningGoal?: boolean;
                    emptyNet?: boolean;
                };
                about: {
                    eventIdx: number;
                    eventId: number;
                    period: number;
                    periodType: string;
                    ordinalNum: string;
                    periodTime: string;
                    periodTimeRemaining: string;
                    dateTime: string;
                    goals: {
                        away: number;
                        home: number;
                    };
                };
                coordinates: {
                    x: number;
                    y: number;
                };
                team: {
                    id: number;
                    name: string;
                    link: string;
                    triCode: string;
                };
            }>;
            /**
             * eventIdx
             */
            scoringPlays: number[];
            /**
             * eventIdx
             */
            penaltyPlays: number[];
            playsByPeriod: Array<{
                startIndex: number;
                plays: number[];
                endIndex: number;
            }>
        };
        lineScore?: {
            currentPeriod: number;
            currentPeriodOrdinal: string;
            currentPeriodTimeRemaining: string;
            periods?: Array<{
                periodType: string;
                /** real timestamp */
                startTime: string;
                /** real timestamp */
                endTime: string;
                num: number;
                ordinalNum: string;
                home: {
                    goals: number;
                    shotsOnGoal: number;
                    rinkSide: string;
                };
                away: {
                    goals: number;
                    shotsOnGoal: number;
                    rinkSide: string;
                }
            }>;
            shootoutInfo: {
                away: {
                    scores: number;
                    attempts: number;
                };
                home: {
                    scores: number;
                    attempts: number;
                };
            };
            teams: {
                home: LineScoreTeam;
                away: LineScoreTeam;
            };
            powerPlayStrength: string;
            hasShootout: boolean;
            intermissionInfo: {
                intermissionTimeRemaining: number;
                intermissionTimeElapsed: number;
                inIntermission: boolean;
            };
            powerPlayInfo: {
                situationTimeRemaining: number;
                situationTimeElapsed: number;
                inSituation: boolean;
            };
        };
        boxscore: {
            teams: {
                away: BoxScoreTeam;
                home: BoxScoreTeam;
            }
            officials: Array<{
                official: {
                    id: number;
                    fullName: string;
                    link: string;
                },
                officialType: string;
            }>;
        };
        decisions?: {
            winner: {
                id: number;
                fullName: string;
                link: string;
            };
            loser: {
                id: number;
                fullName: string;
                link: string;
            };
            firstStar: {
                id: number;
                fullName: string;
                link: string;
            };
            secondStar: {
                id: number;
                fullName: string;
                link: string;
            };
            thirdStar: {
                id: number;
                fullName: string;
                link: string;
            };
        };
    };
    odds: GameOddsAndResults[];
}
