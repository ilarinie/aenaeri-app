import React, { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { BaseDataResponse } from '../server/models/BaseDataResponse';
import './App.css';
import { Dashboard } from './views/Dashboard/Dashboard';

const INITIAL_BASE_DATA: BaseDataResponse = {
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

const App: React.FC = () => {

  const [ baseData, setBaseData ] = useState(INITIAL_BASE_DATA);

  useEffect(() => {
    const fetchBaseData = async () => {
      const duu = await fetch('/api/basedata');
      const daa = await duu.json();
      setBaseData(daa);
    };
    fetchBaseData();
  }, []);

  return (
    <Div100vh>
      <div className='App'>
        <Dashboard dataModel={baseData} />
      </div>
    </Div100vh>
  );
};

export default App;
