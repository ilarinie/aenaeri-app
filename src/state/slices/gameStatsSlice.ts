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
        addGameDataForSeason(state, action: PayloadAction<GameDataResponse>) {
            if (!state[action.payload.playerId]) {
                state[action.payload.playerId] = { seasons: [], seasonObject: {} };
            }
            if (state[action.payload.playerId].seasons.indexOf(action.payload.season) < 0) {
                state[action.payload.playerId].seasons.push(action.payload.season);
            }
            state[action.payload.playerId].seasonObject[action.payload.season] = action.payload.data;
            return state;
        },
    },
});

export const {
    addGameDataForSeason,
} = gameDataSlice.actions;

export default gameDataSlice.reducer;
