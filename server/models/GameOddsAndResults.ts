import { OddsGameType } from './OddsGameType';
import { OddsSource } from './OddsSource';
export interface GameOddsAndResults {
    homeOdds: number;
    awayOdds: number;
    drawOdds?: number | undefined;
    updatedAt: number;
    gameName: OddsGameType;
    source: OddsSource;
    bookMakerId: string;
}
