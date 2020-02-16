import { RootState } from '../rootReducer';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import Axios from 'axios';
import { VeikkausAccountBalance } from '../../../server/models/VeikkausAccountBalance';

export type LoginThunk = ThunkAction<void, RootState, null, Action<string>>;

export const doGetVeikkausBalance = (username: string, password: string): LoginThunk => async (dispatch) => {

};