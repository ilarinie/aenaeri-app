import axios from 'axios';
import logger from '../../logger';
import ExtendedBoxScoreSchema, { ExtendedBoxScoreSchemaType } from '../mongo/ExtendedBoxScoreSchema';
import { ExtendedBoxScore } from '../mongo/ExtendedBoxScoreType';
import fs from 'fs';
import { spawnSync } from 'child_process';

const errors: string[] = [];
let currentSeason: string;

interface OddsType {
    league: {
        name: 'nhl';
        seasons: Array<{
            name: '2017/2018' | '2018/2019' | '2019/2020',
            games: GameOdds[];
        }>;
    }
}

interface GameOdds {
    retrieval_url: string;
    retrieval_datetime: string;
    game_datetime: string;
    game_url: string;
    num_possible_outcomes: number;
    team_home: string;
    team_away: string;
    odds_home: string;
    odds_away: string;
    odds_draw: string;
    outcome: 'AWAY' | 'HOME';
    score_home: number;
    score_away: number;
}

let odds: OddsType;


const getCurrentSeason = async (): Promise<string> => {
    if (!currentSeason) {
        const currentSeasonResponse = await axios.get('https://statsapi.web.nhl.com/api/v1/seasons/current');
        currentSeason = currentSeasonResponse.data.seasons[0].seasonId.substr(0, 4);
    }
    return Promise.resolve(currentSeason);
}

const getOddsTypeFromOdds = (gameStartTime: Date, homeTeamName: string, gamePk: number): GameOdds | undefined => {
    const seasonStr = gamePk < 2019000000 ? gamePk < 2018000000 ? '2017/2018' : '2018/2019' : '2019/2020';
    const season = odds.league.seasons.filter(a => a.name === seasonStr)[0];
    if (!season) {
        return undefined;
    }
    return season.games.filter(a => new Date(a.game_datetime).getTime() === gameStartTime.getTime() && a.team_home === homeTeamName)[0];
}


const generateIdsToBeFetched = async (season: string) => {
    if (season === await getCurrentSeason()) {
        logger.info(`Generating game ids for current season ${season}`)
        // Find any saved games that are in preview state
        const previewGames = await ExtendedBoxScoreSchema.find({ gamePk: { $gt: parseInt(season + '000000') }, 'gameData.status.abstractGameState': 'Preview'}).sort({ gamePk: 1 });
        if (previewGames.length === 0) {
            logger.info('Found no games for current season, fetching all games');
            return Promise.resolve(generateRange(season));
        } else {
            logger.info(`Found ${previewGames.length} games with preview status, fetching the rest.`);
            const fromIndex = parseInt(previewGames[0].gamePk.toString().substr(6));
            for (let i = 0; i < previewGames.length; i++) {
                await previewGames[i].remove();
            }
            return Promise.resolve(generateRange(season, fromIndex));
        }
    } else {
        logger.info(`Generating game ids for season ${season}`)
        const gamePkRange = { from: parseInt(season + '000000'), to: parseInt(season + '999999')};
        const gamesFromSeason = await ExtendedBoxScoreSchema.find({ gamePk: { $gt: gamePkRange.from, $lt: gamePkRange.to }});
        if (gamesFromSeason.length >= 1270) {
            logger.info(`Found that season is already fetched, skipping ${season}`)
            // all games fetches
            return Promise.resolve([]);
        } else {
            logger.info(`Found ${gamesFromSeason.length} games for season ${season}, deleting and re-fetching.`)
            for (let i = 0; i < gamesFromSeason.length; i++) {
                await gamesFromSeason[i].remove();
            }
            return Promise.resolve(generateRange(season));
        }
    }


}


const populateOdds = () => {
    const ads = spawnSync('python', ['op.py'], { cwd: 'odds-scraper'});
    odds = JSON.parse(fs.readFileSync('odds-scraper/output/nhl/NHL.json').toString());
}



export const populateBoxScores = async () => {
    populateOdds();

    const gameIds: string[] = [];

    gameIds.push(...await generateIdsToBeFetched('2017'), ...await generateIdsToBeFetched('2018'), ...await generateIdsToBeFetched('2019'));

    for (let i = 0; i < gameIds.length; i++) {
        logger.info('Fetching game id ' + gameIds[i]);
        await fetchAndCreateBoxScore(gameIds[i]);
    }

    logger.info('Box scores populated');
    logger.info(`${errors.length} errors detected.`)
};

const fetchAndCreateBoxScore = async (gameId: string): Promise<any> => {

    const url = `https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`;
    let response : any;
    try {
        response = await axios.request<ExtendedBoxScore>({ method: 'GET', url });

    } catch (err) {
        logger.error('Could not get response for url ' + url + ' Error: ' + err);
        return Promise.resolve();
    }
    const generatedBoxScore: ExtendedBoxScoreSchemaType = {
        ...response.data,
        gameData: {
            ...response.data.gameData,
            players: Object.keys(response.data.gameData.players).map((key) => response.data.gameData.players[key]),
        },
    };
    try {
        const res = await  ExtendedBoxScoreSchema.create(generatedBoxScore);
        const odd = getOddsTypeFromOdds(res.gameData.datetime.dateTime, res.gameData.teams.home.name, res.gamePk);
        if (odd) {
            res.odds =  { homeOdds: parseFloat(odd.odds_home), awayOdds: parseFloat(odd.odds_away), drawOdds: parseFloat(odd.odds_draw) };
            await res.save();
        }
        return Promise.resolve(res);
    } catch (err) {
        logger.error('Error saving: ' + err);
        errors.push('Error saving: ' + err);
        return Promise.resolve(err);
    }
};

const generateRange = (season: string = '2019', from: number = 1, to: number = 1271): string[] => {
    const arr: string[] = [];
    /**
     * 1271 is the number of regular season games per season (82 games * 31 teams / 2 teams/game);
     */
    for (let i = from; i <= to; i++) {
        const gameNumber: string = season + '02';
        if (i < 10) {
            arr.push(gameNumber + '000' + i);
        } else if (i < 100) {
            arr.push(gameNumber + '00' + i);
        } else if (i < 1000) {
            arr.push(gameNumber + '0' + i);
        } else {
            arr.push(gameNumber + i);
        }
    }
    return arr;
};