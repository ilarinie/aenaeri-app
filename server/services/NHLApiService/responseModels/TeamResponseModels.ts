export interface NHLApiTeamResponse {
    id: number;
    name: string;
    link: string;
    venue: {
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
    teamName: string;
    locationName: string;
    firstYearOfPlay: number;
    division: {
      id: number;
      name: string;
      link: string;
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
    roster: {
        roster:
          Array<{
            person: {
              id: number,
              fullName: string;
              link: string;
            };
            jerseyNumber: number;
            position: {
              code: string;
              name: string;
              type: string;
              abbreviation: string;
            }
          }>;
    };
    teamStats: [
      {
        type: {
          displayName: string;
        },
        splits: [
          {
            stat: {
              gamesPlayed: number;
              wins: number;
              losses: number;
              ot: number
              pts: number;
              ptPctg: number;
              goalsPerGame: number
              goalsAgainstPerGame: number;
              evGGARatio: number;
              powerPlayPercentage: number;
              powerPlayGoals: number;
              powerPlayGoalsAgainst: number;
              powerPlayOpportunities: number;
              penaltyKillPercentage: number;
              shotsPerGame: number;
              shotsAllowed: number;
              winScoreFirst: number;
              winOppScoreFirst: number;
              winLeadFirstPer: number;
              winLeadSecondPer: number;
              winOutshootOpp: number;
              winOutshotByOpp: number;
              faceOffsTaken: number;
              faceOffsWon: number;
              faceOffsLost: number;
              faceOffWinPercentage: number;
              shootingPctg: number;
              savePctg: number;
            },
          },
        ],
      }
    ];
  }

export interface NHLApiTeamList {
    copyright: string;
    teams: NHLApiTeamResponse[];
}
