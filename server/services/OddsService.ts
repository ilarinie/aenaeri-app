import { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';
import { UserEntity } from '../db/entities/User';
import { VeikkausService } from './VeikkausService/VeikkausService';
import { PinnacleService } from './PinnacleService/PinnacleService';
import { OddsSource } from '../models/OddsSource';
import { OddsGameType } from '../models/OddsGameType';

export interface OddsService {
    addOddsForGames: (games: ExtendedBoxScoreSchemaDocumentType[], user: UserEntity) => Promise<ExtendedBoxScoreSchemaDocumentType[]>;
}

export const OddsServices: OddsService[] =  [
    VeikkausService.getInstance(),
    // TODO: Uncomment after PinnacleService Finished
    //PinnacleService.getInstance(),
]


export interface OddsType {
    gamePk: number;
    gameName: OddsGameType;
    source: OddsSource;
    homeOdds: number;
    awayOdds: number;
    drawOdds?: number;
    bookMakerId: string;
}