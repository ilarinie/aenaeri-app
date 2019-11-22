import axios from 'axios';
import { Action } from 'redux-starter-kit';
import { ThunkAction } from 'redux-thunk';
import { BaseDataResponse } from '../../../server/models/BaseDataResponse';
import { RootState } from '../rootReducer';
import { setBaseData } from '../slices/baseDataSlice';

export type BaseDataThunk = ThunkAction<void, RootState, null, Action<string>>;

export const fetchBaseData = (): BaseDataThunk => async (dispatch) => {
    try {
        const baseDataString = localStorage.getItem('base_data');
        if (baseDataString) {
            dispatch(setBaseData(JSON.parse(baseDataString)));
        }
        const refreshTime = localStorage.getItem('refresh_time');
        let doRefresh = false;
        if (refreshTime) {
            const refreshResponse = await axios.request<{ doRefresh: boolean }>({method: 'POST', data: { refreshTime }, url: '/api/basedataupdated'});
            doRefresh = refreshResponse.data.doRefresh;
        } else {
            doRefresh = true;
        }
        if (doRefresh) {
            const response = await axios.request<BaseDataResponse>({ method: 'GET', url: '/api/basedata'});
            localStorage.setItem('refresh_time', response.data.refreshTime);
            localStorage.setItem('base_data', JSON.stringify(response.data));
            dispatch(setBaseData(response.data));
        }
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.error('Fetching base data failed.');
        // tslint:disable-next-line: no-console
        console.error(err);
    }
};
