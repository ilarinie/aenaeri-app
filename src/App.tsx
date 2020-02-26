
import { ThemeProvider } from 'emotion-theming';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Box, Flex } from 'rebass';
import { Login } from './components/Login';
import { TopBar } from './components/TopBar';
import { ACCOUNT_ROUTE, PLAYERS_ROUTE, ROOT_ROUTE, STATS_ROUTE, TEAMS_ROUTE } from './routes';
import { RootState } from './state/rootReducer';
import { LOGIN_STATUS } from './state/slices/uiStateSlice';
import { fetchBaseData } from './state/thunks/BaseDataThunk';
import { checkLogin } from './state/thunks/LoginThunks';
import theme, { Theme } from './theme';
import { AccountView } from './views/Account/AccountView';
import { PlayerDetail } from './views/PlayerDetail/PlayerDetail';
import { StatsDetail } from './views/StatsDetail/StatsDetail';
import { TeamDetail } from './views/TeamDetail/TeamDetail';
import { LoadingIndicator } from './components/LoadingIndicator';


const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const BettingDashboard = React.lazy(() => import('./views/BettingDashboard/BettingDashboard'));


const App: React.FC<RouteComponentProps> = ({ history }) => {

    const baseData = useSelector((state: RootState) => state.baseData);
    const loggedIn = useSelector((state: RootState) => state.uiState.loggedIn);
    const dispatch = useDispatch();

    const navigate = (path: string) => {
        history.push(path);
    };

    useEffect(() => {
        dispatch(fetchBaseData());
        dispatch(checkLogin());
    }, [dispatch]);

    return (
      <ThemeProvider<typeof theme> theme={theme}>
        <Flex
          flexDirection='column'
          height='100%'
          backgroundColor='background'
          sx={(contextTheme: Theme) => ({
              fontFamily: contextTheme.fonts.sans,
              color: contextTheme.colors.text,
          })}
          bg='background'>
          { loggedIn === LOGIN_STATUS.CHECKING_LOGIN_STATUS && <LoadingIndicator /> }
          { loggedIn === LOGIN_STATUS.LOGGED_OUT && <Login /> }
          { loggedIn === LOGIN_STATUS.LOGGED_IN &&
            <>
              <TopBar navigate={navigate} players={baseData.players} teams={baseData.teams} />
              <Flex flexDirection='column'>
                <React.Suspense fallback={<LoadingIndicator />} >
                  <Switch>
                    <Route exact path={ROOT_ROUTE} render={(props) => <BettingDashboard {...props} />} />
                    <Route exact path={'/nhl-stats'} render={(props) => <Dashboard {...props} />}  />
                    <Route path={PLAYERS_ROUTE + ':id'} component={PlayerDetail} />
                    <Route path={TEAMS_ROUTE + ':id'} component={TeamDetail} />
                    <Route path={STATS_ROUTE + ':stat'} component={StatsDetail} />
                    <Route path={ACCOUNT_ROUTE} component={AccountView} />
                  </Switch>
                </React.Suspense>
                
              </Flex>
            </>
          }
        </Flex>
      </ThemeProvider>
    );
};

export default App;
