import { GameOddsAndResults } from '../db/mongo/GameOddsAndResultsSchema';

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
    odds?: GameOddsAndResults;
}

export interface LineScoreTeam {
    team: {
        id: number;
        name: string;
        link: string;
        abbreviation: string;
        triCode: string;
    };
    goals: number;
    shotsOnGoal: number;
    goaliePulled: boolean;
    numSkaters: number;
    powerPlay: boolean;
}

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

export interface GameDataPlayer {
    id: number;
    fullName: string;
    link: string;
    firstName: string;
    lastName: string;
    primaryNumber: string;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    nationality: string;
    height: string;
    weight: number;
    active: boolean;
    alternateCaptain: boolean;
    captain: boolean;
    rookie: boolean;
    shootsCatches: string;
    rosterStatus: string;
    currentTeam: {
        id: number;
        name: string;
        link: string;
        triCode: string;
    };
    primaryPosition: {
        code: string;
        name: string;
        type: string;
        abbreviation: string;
    };
}

export interface GameDataTeam {
    id: number;
    name: string;
    link: string;
    venue: {
        id: number;
        name: string;
        link: string;
        city: string;
        timeZone: {
            id: string;
            offset: number;
            tz: string;
        }
    };
    abbreviation: string;
    triCode: string;
    teamName: string;
    locationName: string;
    firstYearOfPlay: string;
    division: {
        id: number;
        name: string;
        nameShort: string;
        link: string;
        abbreviation: string;
    };
    conference: {
        id: number;
        name: string;
        link: string;
    };
    franchise: {
        franchiseId: number;
        teamName: string;
        link: string;
    };
    shortName: string;
    officialSiteUrl: string;
    franchiseId: number;
    active: boolean;
}
