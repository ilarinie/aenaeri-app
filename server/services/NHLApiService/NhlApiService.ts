import axios from 'axios';
import { NHLApiGoalieStatsResponse } from './responseModels/GoalieStatsResponseModels';
import { NHLApiPlayerResponse } from './responseModels/PlayerResponseModels';
import { NHLApiSkaterStatsResponse } from './responseModels/SkaterStatsResponseModels';
import { NHLApiSkaterGameByGameStatsResponse, NHLApiGoalieGameByGameStatsResponse } from './responseModels/PlayerGameByGameStatsResponseModels';
import { NHLApiCurrentDaySchedule } from './responseModels/CurrentDaySchedule';

export namespace NhlApiService {

    const PLAYER_ENDPOINT = 'https://statsapi.web.nhl.com/api/v1/people/';

    const isInvalidSeasonString = (season: string) => !(/20\d{2}20\d{2}/.test(season));

    const statsEndpoint = (playerId: number, season: string): string => {
        return `${PLAYER_ENDPOINT}/${playerId}/stats?stats=statsSingleSeason&season=${season}`;
    };

    const gameByGameEndpoint = (playerId: number, season: string): string => {
        return `${PLAYER_ENDPOINT}/${playerId}/stats?stats=gameLog&season=${season}`;
    };

    export const fetchPlayer = async (playerId: number): Promise<NHLApiPlayerResponse> => {
        const response = await axios.request<NHLApiPlayerResponse>({ method: 'GET', url: PLAYER_ENDPOINT + playerId });
        return Promise.resolve(response.data);
    };

    const fetchSingleSeasonStats = async <T>(playerId: number, season: string): Promise<T> => {
        if (isInvalidSeasonString(season)) {
            return Promise.reject({ message: `Invalid season string ${season}` });
        }
        const response = await axios.request<T>({ method: 'GET', url: statsEndpoint(playerId, season) });
        return Promise.resolve(response.data);
    };

    export const fetchSkaterSeasonStats = async (playerId: number, season: string): Promise<NHLApiSkaterStatsResponse> => {
        return fetchSingleSeasonStats<NHLApiSkaterStatsResponse>(playerId, season);
    };

    export const fetchGoalieSeasonStats = async (playerId: number, season: string): Promise<NHLApiGoalieStatsResponse> => {
        return fetchSingleSeasonStats<NHLApiGoalieStatsResponse>(playerId, season);
    };

    const fetchPlayerGameByGameStats = async <T>(playerId: number, season: string): Promise<T> => {
        if (isInvalidSeasonString(season)) {
            return Promise.reject({ message: `Invalid season string ${season}` });
        }
        const response = await axios.request<T>({ method: 'GET', url: gameByGameEndpoint(playerId, season) });
        return Promise.resolve(response.data);
    };

    export const fetchSkaterGameByGameStats = async (playerId: number, season: string): Promise<NHLApiSkaterGameByGameStatsResponse> => {
        return fetchPlayerGameByGameStats<NHLApiSkaterGameByGameStatsResponse>(playerId, season);
    };

    export const fetchGoalieGameByGameStats = async (playerId: number, season: string): Promise<NHLApiGoalieGameByGameStatsResponse> => {
        return fetchPlayerGameByGameStats<NHLApiGoalieGameByGameStatsResponse>(playerId, season);
    };

    export const fetchCurrentDaySchedule = async (): Promise<NHLApiCurrentDaySchedule> => {
        const response = await axios.request<NHLApiCurrentDaySchedule>({ method: 'GET', url: 'https://statsapi.web.nhl.com/api/v1/schedule' });
        return Promise.resolve(response.data);
    }
}
