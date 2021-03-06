import mongoose from 'mongoose';
import { OddsGameType } from '../../models/OddsGameType';
import { OddsSource } from '../../models/OddsSource';

export const GameOddsAndResultsSchema = new mongoose.Schema<GameOddsAndResults>({
    homeOdds: Number,
    awayOdds: Number,
    drawOdds: { type: Number, nullable: true },
    gameName: String,
    updatedAt: { type: Number, nullable: true },
    source: String,
    bookMakerId: String,
});
export interface GameOddsAndResults {
    homeOdds: number;
    awayOdds: number;
    drawOdds?: number | undefined;
    updatedAt?: number;
    gameName: OddsGameType;
    source: OddsSource;
    bookMakerId: string;
}
