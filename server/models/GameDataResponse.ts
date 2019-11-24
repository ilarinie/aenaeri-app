import { GoalieGameStats } from './GoalieGameStats';
import { SkaterGameStats } from './SkaterGameStats';

export interface GameDataResponse {
    playerId: string;
    season: string;
    data: {
        dateList: string[];
        gameDataObject: {
            [date: string]: SkaterGameStats | GoalieGameStats;
        };
    };
}
