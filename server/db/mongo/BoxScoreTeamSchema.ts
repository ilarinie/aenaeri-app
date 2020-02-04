import * as mongoose from 'mongoose';
import { BoxScorePlayerSchema } from './BoxScorePlayerSchema';
import { SchemaTypes } from 'mongoose';

export const BoxScoreTeamSchema = new mongoose.Schema({
    team: {
        id: Number,
        name: String,
        link: String,
        abbreviation: String,
        triCode: String,
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
    players: [BoxScorePlayerSchema],
    goalies: [Number],
    skaters: [Number],
    onIce: [Number],
    onIcePlus: [SchemaTypes.Mixed],
    scratches: [Number],
    penaltyBox: [Number],
    coaches: [SchemaTypes.Mixed]
});
