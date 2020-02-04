import * as mongoose from 'mongoose';

export const LineScoreTeamSchema = new mongoose.Schema({
    team: {
        id: Number,
        name: String,
        link: String,
        abbreviation: String,
        triCode: String,
    },
    goals: Number,
    shotsOnGoal: Number,
    goaliePulled: Boolean,
    numSkaters: Number,
    powerPlay: Boolean,
});
