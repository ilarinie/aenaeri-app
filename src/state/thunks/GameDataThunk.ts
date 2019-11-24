import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GameDataResponse } from '../../../server/models/GameDataResponse';
import { RootState } from '../rootReducer';
import { addGameDataForSeason } from '../slices/gameStatsSlice';
import store from '../store';

export type BaseDataThunk = ThunkAction<void, RootState, null, Action<string>>;

export const fetchGameData = (playerId: string, season: string): BaseDataThunk => async (dispatch) => {
    if (!(store.getState().gameData[playerId] && store.getState().gameData[playerId].seasonObject[season])) {
        const response = await axios.request<GameDataResponse>({ method: 'GET', url: '/api/gamestats/' + playerId });
        dispatch(addGameDataForSeason(response.data));
    }
};
