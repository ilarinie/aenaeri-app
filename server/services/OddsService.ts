import { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';
import { UserEntity } from '../db/entities/User';
import { VeikkausService } from './VeikkausService/VeikkausService';
import { PinnacleService } from './PinnacleService/PinnacleService';

export interface OddsService {
    getOddsForGames: (games: ExtendedBoxScoreSchemaDocumentType[], user: UserEntity) => Promise<OddsType[]>;
}

export const OddsServices: OddsService[] =  [
    VeikkausService.getInstance(),
    // TODO: Uncomment after PinnacleService Finished
    //PinnacleService.getInstance(),
]


export interface OddsType {
    gamePk: number;
    gameName: string;
    homeOdds: number;
    awayOdds: number;
    drawOdds: number;
}