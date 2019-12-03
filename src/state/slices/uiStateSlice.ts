import { createSlice, PayloadAction } from 'redux-starter-kit';
import { User } from '../../../server/models/User';

export enum LOGIN_STATUS {
    CHECKING_LOGIN_STATUS, LOGGED_IN, LOGGED_OUT,
}

interface UIState {
    loggedIn: LOGIN_STATUS;
    user: User | undefined;
}

const initialState: UIState = {
    loggedIn: LOGIN_STATUS.CHECKING_LOGIN_STATUS,
    user: undefined,
};

const UIStateSlice = createSlice({
    name: 'uiState',
    initialState,
    reducers: {
        setLoginStatus(state, action: PayloadAction<LOGIN_STATUS>) {
            state.loggedIn = action.payload;
            return state;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            return state;
        },
    },
});

export const {
    setLoginStatus,
    setUser,
} = UIStateSlice.actions;

export default UIStateSlice.reducer;
