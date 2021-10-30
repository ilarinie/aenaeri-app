import * as mongoose from 'mongoose';

export const GameDataTeamSchema = new mongoose.Schema({
    id: Number,
    name: String,
    link: String,
    // @ts-ignore
    venue: {
        id: Number,
        name: String,
        link: String,
        city: String,
        timeZone: {
            id: String,
            offset: Number,
            tz: String,
        }
    },
    abbreviation: String,
    triCode: String,
    teamName: String,
    locationName: String,
    firstYearOfPlay: String,
    division: {
        id: Number,
        name: String,
        nameShort: String,
        link: String,
        abbreviation: String,
    },
    conference: {
        id: Number,
        name: String,
        link: String,
    },
    franchise: {
        franchiseId: Number,
        teamName: String,
        link: String,
    },
    shortName: String,
    officialSiteUrl: String,
    franchiseId: Number,
    active: Boolean,
});
