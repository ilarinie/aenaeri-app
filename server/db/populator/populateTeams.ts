import axios from 'axios';
import { getConnectionManager } from 'typeorm';
import { initializeDB } from '..';
import { NHLApiTeamList, NHLApiTeamResponse, TeamEntity } from '../entities/Team';

export const populateTeams = async (): Promise<number[]> => {
    if (getConnectionManager().connections.length === 0) {
        await initializeDB();
    }
    TeamEntity.clear();
    const response = await axios.request<NHLApiTeamList>({ method: 'GET', url: 'https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster'});
    const teamList: NHLApiTeamResponse[] = response.data.teams;
    const playerIds: number[] = [];
    await Promise.all(teamList.map((team) => {
        playerIds.push(...team.roster.roster.map((r) => r.person.id));
        return TeamEntity.fromNHLApiTeamResponse(team).save();
    }));
    return Promise.resolve(playerIds);
};
