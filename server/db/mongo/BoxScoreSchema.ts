import * as mongoose from 'mongoose';
import { SchemaTypes } from 'mongoose';

const PersonSchema = new mongoose.Schema({
    person: {
        id: Number,
        fullName: String,
        link: String,
        firstName: String,
        lastName: String,
        primaryNumber: String,
        birthDate: String,
        currentAge: Number,
        birthCity: String,
        birthStateProvince: String,
        birthCountry: String,
        nationality: String,
        height: String,
        weight: Number,
        active:  Boolean,
        alternateCaptain: Boolean,
        captain: Boolean,
        rookie: Boolean,
        shootsCatches: String,
        rosterStatus: String,
        currentTeam: {
          id: Number,
          name: String,
          link: String,
        },
        primaryPosition: {
            code: SchemaTypes.Mixed,
            name: SchemaTypes.Mixed,
            type: SchemaTypes.Mixed,
            abbreviation: SchemaTypes.Mixed,
          },
      },
      jerseyNumber: String,
     position:  {
            code: SchemaTypes.Mixed,
            name: SchemaTypes.Mixed,
            type: SchemaTypes.Mixed,
            abbreviation: SchemaTypes.Mixed,
          },
      stats: {
        skaterStats: {
          timeOnIce: String,
          assists: Number,
          goals: Number,
          shots: Number,
          hits: Number,
          powerPlayGoals: Number,
          powerPlayAssists: Number,
          penaltyMinutes: Number,
          faceOffWins: Number,
          faceoffTaken: Number,
          takeaways: Number,
          giveaways: Number,
          shortHandedGoals: Number,
          shortHandedAssists: Number,
          blocked: Number,
          plusMinus: Number,
          evenTimeOnIce: String,
          powerPlayTimeOnIce: String,
          shortHandedTimeOnIce: String,
        },
        goalieStats: {
          timeOnIce: String,
          assists: Number,
          goals: Number,
          pim: Number,
          shots: Number,
          saves: Number,
          powerPlaySaves: Number,
          shortHandedSaves: Number,
          evenSaves: Number,
          shortHandedShotsAgainst: Number,
          evenShotsAgainst: Number,
          powerPlayShotsAgainst: Number,
          decision: String,
          savePercentage: Number,
          powerPlaySavePercentage: Number,
          evenStrengthSavePercentage: Number,
        },
      },
});

const TeamSchema = new mongoose.Schema({
        team: {
        id: Number,
        name: String,
        link: String,
      },
      teamStats: {
        teamSkaterStats: {
          goals: Number,
          pim: Number,
          shots: Number,
          powerPlayPercentage: String,
          powerPlayGoals: Number,
          powerPlayOpportunities: Number,
          faceOffWinPercentage: String,
          blocked: Number,
          takeaways: Number,
          giveaways: Number,
          hits: Number,
        },
      },
      players: [PersonSchema],
      goalies: [Number],
      skaters: [Number],
      onIce: [Number],
      onIcePlus: [{
          playerId: Number,
          shiftDuration: Number,
          stamina: Number,
      }],
      scratches: [Number],
      penaltyBox: [Number],
      coaches: [{
          person: {
            fullName: String,
            link: String,
          },
          position: {
            code: SchemaTypes.Mixed,
            name: SchemaTypes.Mixed,
            type: SchemaTypes.Mixed,
            abbreviation: SchemaTypes.Mixed,
          },
      }],
});

const BoxScoreSchema = new mongoose.Schema({
    copyright: String,
    teams: {
        away: TeamSchema,
        home: TeamSchema,
    },
    officials: [{
        official: {
          id: Number,
          fullName: String,
          link: String,
        },
        officialType: String,
      }],
});

export interface GameBoxScore {
    copyright: string;
    teams: {
      away: Team;
      home: Team;
    };
    officials: Array<{
        official: {
          id: number;
          fullName: string;
          link: string;
        },
        officialType: string;
      }>;
  }

interface Team {
        team: {
          id: number;
          name: string;
          link: string;
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
          },
        };
        players: {
            [id: string]: Person;
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
        penaltyBox: [];
        coaches: Array<{
            person: {
              fullName: string;
              link: string;
            },
            position: {
              code: string;
              name: string;
              type: string;
              abbreviation: string;
            },
        }>;
  }

interface Person {
        person: {
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
          },
          primaryPosition: {
            code: string;
            name: string;
            type: string;
            abbreviation: string;
          },
        };
        jerseyNumber: string;
        position: {
          code: string;
          name: string;
          type: string;
          abbreviation: string;
        };
        stats: {
          skaterStats: {
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
          }
          goalieStats: {
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
          },
        };
  }

export default mongoose.model('BoxScore', BoxScoreSchema);
