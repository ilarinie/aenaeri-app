import { combineReducers } from 'redux-starter-kit';
import baseDataReducer from './slices/baseDataSlice';
import gameDataReducer from './slices/gameStatsSlice';
import UIStateReducer from './slices/uiStateSlice';

const rootReducer = combineReducers({ baseData: baseDataReducer, gameData: gameDataReducer, uiState: UIStateReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
