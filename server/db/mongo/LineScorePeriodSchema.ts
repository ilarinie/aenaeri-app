import * as mongoose from 'mongoose';

export const LineScorePeriodSchema = new mongoose.Schema({
    periodType: String,
    /** real timestamp */
    startTime: String,
    /** real timestamp */
    endTime: String,
    num: Number,
    ordinalNum: String,
    home: {
        goals: Number,
        shotsOnGoal: Number,
        rinkSide: String,
    },
    away: {
        goals: Number,
        shotsOnGoal: Number,
        rinkSide: String,
    }
});
