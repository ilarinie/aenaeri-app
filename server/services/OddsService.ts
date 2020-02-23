import { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';
import { UserEntity } from '../db/entities/User';

export interface OddsService {
    getOddsForGames: (games: ExtendedBoxScoreSchemaDocumentType[], user: UserEntity) => Promise<OddsType[]>;
}


export interface OddsType {
    gamePk: number;
    gameName: string;
    homeOdds: number;
    awayOdds: number;
    drawOdds: number;
}