import { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';

export interface OddsService {
    getOddsForGames: (games: ExtendedBoxScoreSchemaDocumentType[]) => Promise<OddsType[]>;
}


export interface OddsType {
    gamePk: number;
    gameName: string;
    homeOdds: number;
    awayOdds: number;
    drawOdds: number;
}