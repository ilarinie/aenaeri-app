import { Action } from 'redux-starter-kit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { setBaseData } from '../slices/baseDataSlice';

export type BaseDataThunk = ThunkAction<void, RootState, null, Action<string>>;

export const fetchBaseData = (): BaseDataThunk => async (dispatch) => {
    try {
        const duu = await fetch('/api/basedata');
        const daa = await duu.json();
        dispatch(setBaseData(daa));
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.error('Fetching base data failed.');
    }
};
