import { getManager } from 'typeorm';
import { TeamStandings } from '../../models/BaseDataResponse';

export const getTeamStandings = async (): Promise<TeamStandings> => {
    const res = await Promise.all([
        getDivisionStandings('Metropolitan'),
        getDivisionStandings('Central'),
        getDivisionStandings('Pacific'),
        getDivisionStandings('Atlantic'),
        getConfrenceStandings('Western'),
        getConfrenceStandings('Eastern'),
        getNHLStandings(),
    ]);
    return Promise.resolve({
        metropolitan: res[0],
        central: res[1],
        pacific: res[2],
        atlantic: res[3],
        western: res[4],
        eastern: res[5],
        nhl: res[6],
    });
};

const getDivisionStandings = async (division: string): Promise<string[]> => {
    const sql = `
    SELECT "teamId" FROM team_single_season_stats_entity
    RIGHT JOIN team_entity
        ON "teamId" = team_entity.id
    WHERE team_entity.division = '${division}'
    ORDER BY pts DESC;
    `;

    const resp = await getManager().query(sql);
    return Promise.resolve(resp.map((r: any) => r.teamId));
};

const getConfrenceStandings = async (confrence: string): Promise<string[]> => {
    const sql = `
        SELECT "teamId", pts, name FROM team_single_season_stats_entity
        RIGHT JOIN team_entity
            ON "teamId" = team_entity.id
        WHERE team_entity.confrence = '${confrence}'
        ORDER BY pts DESC;
    `;
    const resp = await getManager().query(sql);
    return Promise.resolve(resp.map((r: any) => r.teamId));
};

const getNHLStandings = async (): Promise<string[]> => {
    const sql = `
        SELECT "teamId" FROM team_single_season_stats_entity
        ORDER BY pts DESC;
    `;
    const resp = await getManager().query(sql);
    return Promise.resolve(resp.map((r: any) => r.teamId));
};
