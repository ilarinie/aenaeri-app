import { createSlice, PayloadAction } from 'redux-starter-kit';
import { GameDataResponse } from '../../../server/models/GameDataResponse';
import { GoalieGameStats } from '../../../server/models/GoalieGameStats';
import { SkaterGameStats } from '../../../server/models/SkaterGameStats';

interface GameData {
    [playerId: string]: {
        seasons: string[];
        seasonObject: {
            [season: string]: GameDataSeason;
        };
    };
}

export interface GameDataSeason {
    season: string;
    dateList: string[];
    gameDataObject: {
        [date: string]: GoalieGameStats | SkaterGameStats;
    };
}

const initialState: GameData = {};

const gameDataSlice = createSlice({
    name: 'gameStats',
    initialState,
    reducers: {
        addGameDataForSeason(state, action: PayloadAction<GameDataResponse[]>) {
            action.payload.forEach((gameDataSeason) => {
                if (!state[gameDataSeason.playerId]) {
                    state[gameDataSeason.playerId] = { seasons: [], seasonObject: {} };
                }
                if (state[gameDataSeason.playerId].seasons.indexOf(gameDataSeason.season) < 0) {
                    state[gameDataSeason.playerId].seasons.push(gameDataSeason.season);
                }
                state[gameDataSeason.playerId].seasonObject[gameDataSeason.season] = { ...gameDataSeason.data, season: gameDataSeason.season };
            })
            return state;
        },
    },
});

export const {
    addGameDataForSeason,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
