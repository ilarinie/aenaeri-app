import { createSlice, PayloadAction } from 'redux-starter-kit';
import { VeikkausAccountBalance } from '../../../server/models/VeikkausAccountBalance';

interface UserState {
    veikkausAccountBalance: VeikkausAccountBalance | undefined;
}

const initialState: UserState = {
    veikkausAccountBalance: undefined,
};

const UserStateSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setVeikkausAccountBalance(state, action: PayloadAction<VeikkausAccountBalance>) {
            state.veikkausAccountBalance = action.payload;
            return state;
        },
    },
});

export const {
    setVeikkausAccountBalance,
} = UserStateSlice.actions;

export default UserStateSlice.reducer;
