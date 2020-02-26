import { UserEntity } from '../db/entities/User';
import { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';
import { OddsGameType } from '../models/OddsGameType';
import { OddsSource } from '../models/OddsSource';
import { PinnacleService } from './PinnacleService/PinnacleService';
import { VeikkausService } from './VeikkausService/VeikkausService';

export interface OddsService {
    addOddsForGames: (games: ExtendedBoxScoreSchemaDocumentType[], user: UserEntity) => Promise<ExtendedBoxScoreSchemaDocumentType[]>;
}

export const OddsServices: OddsService[] =  [
    VeikkausService.getInstance(),
    PinnacleService.getInstance(),
];

export interface OddsType {
    gamePk: number;
    gameName: OddsGameType;
    source: OddsSource;
    homeOdds: number;
    awayOdds: number;
    drawOdds?: number;
    bookMakerId: string;
}
