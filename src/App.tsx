import React, { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Login } from './components/Login';
import { TopBar } from './components/TopBar';
import { ACCOUNT_ROUTE, PLAYERS_ROUTE, ROOT_ROUTE, TEAMS_ROUTE } from './routes';
import { RootState } from './state/rootReducer';
import { LOGIN_STATUS } from './state/slices/uiStateSlice';
import { fetchBaseData } from './state/thunks/BaseDataThunk';
import { checkLogin } from './state/thunks/LoginThunks';
import { AccountView } from './views/Account/AccountView';
import { Dashboard } from './views/Dashboard/Dashboard';
import { PlayerDetail } from './views/PlayerDetail/PlayerDetail';
import { TeamDetail } from './views/TeamDetail/TeamDetail';

const RouterViewContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  padding-top: 70px;
`;

const App: React.FC<RouteComponentProps> = ({ history }) => {

  const baseData = useSelector((state: RootState) => state.baseData);
  const loggedIn = useSelector((state: RootState) => state.uiState.loggedIn);
  const dispatch = useDispatch();

  const [ modalOpen, setModalOpen ] = useState(false);

  const navigate = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    dispatch(fetchBaseData());
    dispatch(checkLogin());
  }, [dispatch]);

  return (
    <Div100vh>
      { loggedIn === LOGIN_STATUS.CHECKING_LOGIN_STATUS && <span>Loading...</span> }
      { loggedIn === LOGIN_STATUS.LOGGED_OUT && <Login /> }
      { loggedIn === LOGIN_STATUS.LOGGED_IN &&
        <>
          <TopBar navigate={navigate} players={baseData.players} teams={baseData.teams} openLoginModal={() => setModalOpen(true)} />
          <RouterViewContainer>
            <Switch>
              <Route exact path={[ROOT_ROUTE, '/nhl-stats']} component={Dashboard} />
              <Route path={PLAYERS_ROUTE + ':id'} component={PlayerDetail} />
              <Route path={TEAMS_ROUTE + ':id'} component={TeamDetail} />
              <Route path={ACCOUNT_ROUTE} component={AccountView} />
            </Switch>
          </RouterViewContainer>
        </>
      }
    </Div100vh>
  );
};

export default App;
