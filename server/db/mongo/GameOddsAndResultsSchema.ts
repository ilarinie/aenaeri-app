import mongoose from 'mongoose';

export const GameOddsAndResultsSchema = new mongoose.Schema<GameOddsAndResults>({
    homeOdds: Number,
    awayOdds: Number,
    drawOdds: { type: Number, nullable: true },
    gameName: String,
    updatedAt: { type: Number, nullable: true },
    source: String,
});
export interface GameOddsAndResults {
    homeOdds: number;
    awayOdds: number;
    drawOdds: number | undefined;
    updatedAt?: number;
    gameName: String,
    source?: 'oddsPortal' | 'veikkaus'
}
