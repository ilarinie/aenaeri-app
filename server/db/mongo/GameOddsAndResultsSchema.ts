import mongoose from 'mongoose';

export const GameOddsAndResultsSchema = new mongoose.Schema<GameOddsAndResults>({
    homeOdds: Number,
    awayOdds: Number,
    drawOdds: Number,
});
export interface GameOddsAndResults {
    homeOdds: number;
    awayOdds: number;
    drawOdds: number;
}
