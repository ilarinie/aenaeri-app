import { createSlice, PayloadAction } from 'redux-starter-kit';
import { BaseDataResponse } from '../../../server/models/BaseDataResponse';

const initialState: BaseDataResponse = {
        refreshTime: '',
        teams: {
            teamList: [],
            teamObject: {},
          },
          players: {
            playerList: [],
            playerObject: {},
          },
          skaterStats: {},
          goalieStats: {},
          playerStandings: {
            goals: [],
            assists: [],
            points: [],
            finnishPlayers: [],
            savePct: [],
            gaa: [],
            gpg: [],
            ppg: [],
          },
          teamStats: {},
          teamStandings: {
            metropolitan: [],
            atlantic: [],
            central: [],
            western: [],
            eastern: [],
            pacific: [],
            nhl: [],
          },
};

const baseDataSlice = createSlice({
  name: 'baseData',
  initialState,
  reducers: {
    setBaseData(state, action: PayloadAction<BaseDataResponse>) {
        state = action.payload;
        return state;
    },
  },
});

export const {
    setBaseData,
} = baseDataSlice.actions;

export default baseDataSlice.reducer;
