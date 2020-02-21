import mongoose from 'mongoose';

export const GameOddsAndResultsSchema = new mongoose.Schema<GameOddsAndResults>({
    homeOdds: Number,
    awayOdds: Number,
    drawOdds: Number,
    updatedAt: { type: Number, nullable: true },
    source: String,
});
export interface GameOddsAndResults {
    homeOdds: number;
    awayOdds: number;
    drawOdds: number;
    updatedAt?: number;
    source?: 'oddsPortal' | 'veikkaus'
}
