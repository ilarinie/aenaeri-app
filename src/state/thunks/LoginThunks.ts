import axios from 'axios';
import { Action } from 'redux-starter-kit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { LOGIN_STATUS, setLoginStatus, setUser } from '../slices/uiStateSlice';

export type LoginThunk = ThunkAction<void, RootState, null, Action<string>>;

export const doLogin = (username: string, password: string): LoginThunk => async (dispatch) => {
    try {
        const response = await axios.request({ url: '/api/login', method: 'POST', data: { username, password }});
        axios.defaults.headers = response.headers;
        localStorage.setItem('token', response.headers.authentication);
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_IN));
    } catch (err) {
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    }
};

export const checkLogin = (): LoginThunk => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.authorization = token;
        }
        const response = await axios.request({ url: '/api/checklogin' });
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_IN));
        dispatch(setUser(response.data.user));
    } catch (err) {
        dispatch(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    }
};
