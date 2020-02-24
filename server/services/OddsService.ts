import { ExtendedBoxScoreSchemaDocumentType } from '../db/mongo/ExtendedBoxScoreSchema';
import { UserEntity } from '../db/entities/User';
import { VeikkausService } from './VeikkausService/VeikkausService';
import { PinnacleService } from './PinnacleService/PinnacleService';

export type OddsGameType = 
    '1X2' |
    '12' |
    'HOME_HANDICAP+1' |
    'HOME_HANDICAP+2' |
    'HOME_HANDICAP+3' |
    'HOME_HANDICAP+4' |
    'HOME_HANDICAP+5' |
    'AWAY_HANDICAP+1' |
    'AWAY_HANDICAP+2' |
    'AWAY_HANDICAP+3' |
    'AWAY_HANDICAP+4' |
    'AWAY_HANDICAP+5' ;

export type OddsSource = 'veikkaus' | 'oddsPortal' | 'pinnacle';

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