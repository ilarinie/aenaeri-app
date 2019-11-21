import { combineReducers } from 'redux-starter-kit';
import baseDataReducer from './slices/baseDataSlice';

const rootReducer = combineReducers({baseData: baseDataReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
