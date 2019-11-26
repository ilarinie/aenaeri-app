import React, { useEffect } from 'react';
import Div100vh from 'react-div-100vh';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { TopBar } from './components/TopBar';
import { PLAYERS_ROUTE, ROOT_ROUTE, TEAMS_ROUTE } from './routes';
import { RootState } from './state/rootReducer';
import { fetchBaseData } from './state/thunks/BaseDataThunk';
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
  const dispatch = useDispatch();

  const navigate = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    dispatch(fetchBaseData());
  }, [dispatch]);

  return (
    <Div100vh>
      <TopBar navigate={navigate} players={baseData.players} teams={baseData.teams} />
      <RouterViewContainer>
        <Switch>
          <Route exact path={ROOT_ROUTE} component={Dashboard} />
          <Route path={PLAYERS_ROUTE + ':id'} component={PlayerDetail} />
          <Route path={TEAMS_ROUTE + ':id'} component={TeamDetail} />
        </Switch>
      </RouterViewContainer>
    </Div100vh>
  );
};

export default App;
