import * as mongoose from 'mongoose';
import { SchemaTypes } from 'mongoose';

export const GameDataPlayerSchema = new mongoose.Schema({
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
    active: Boolean,
    alternateCaptain: Boolean,
    captain: Boolean,
    rookie: Boolean,
    shootsCatches: String,
    rosterStatus: String,
    currentTeam: {
        id: Number,
        name: String,
        link: String,
        triCode: String,
    },
    primaryPosition: {
        code: SchemaTypes.Mixed,
        name: SchemaTypes.Mixed,
        type: SchemaTypes.Mixed,
        abbreviation: SchemaTypes.Mixed,
    },
});
