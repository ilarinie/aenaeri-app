import axios from 'axios';
import { getConnectionManager } from 'typeorm';
import { initializeDB } from '..';
import { NHLApiTeamList, NHLApiTeamResponse } from '../../services/NHLApiService/responseModels/TeamResponseModels';
import {  TeamEntity } from '../entities/Team';
import { TeamSingleSeasonStatsEntity } from '../entities/TeamSingleSeasonStats';

export const populateTeams = async (): Promise<number[]> => {
    if (getConnectionManager().connections.length === 0) {
        await initializeDB();
    }
    TeamEntity.clear();
    TeamSingleSeasonStatsEntity.clear();
    const response = await axios.request<NHLApiTeamList>({ method: 'GET', url: 'https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster'});
    const responseWithStats = await axios.request<NHLApiTeamList>({ method: 'GET', url: 'https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats'});

    const teamList: NHLApiTeamResponse[] = response.data.teams;
    const teamWithStatList: NHLApiTeamResponse[] = responseWithStats.data.teams;

    const playerIds: number[] = [];
    await Promise.all<any>([
        ...teamList.map((team) => {
            playerIds.push(...team.roster.roster.map((r) => r.person.id));
            return TeamEntity.fromNHLApiTeamResponse(team).save();
        }),
        ...teamWithStatList.map((team) => {
            return TeamSingleSeasonStatsEntity.fromNHLApiTeamResponse(team).save();
        }),
    ]);
    return Promise.resolve(playerIds);
};
