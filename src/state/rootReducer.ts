import { combineReducers } from 'redux-starter-kit';
import baseDataReducer from './slices/baseDataSlice';
import gameDataReducer from './slices/gameStatsSlice';

const rootReducer = combineReducers({ baseData: baseDataReducer, gameData: gameDataReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
