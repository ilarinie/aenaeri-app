import axios from 'axios';
import { subMinutes } from 'date-fns';
import { UserEntity } from '../../db/entities/User';
import { ExtendedBoxScoreSchemaDocumentType } from '../../db/mongo/ExtendedBoxScoreSchema';
import { GameOddsAndResults } from '../../db/mongo/GameOddsAndResultsSchema';
import logger from '../../logger';
import { OddsService } from '../OddsService';

let pinnacleService;

export const getNormalizedTeamName = (teamName: string): string => {
    switch (teamName) {
        case 'Montréal Canadiens':
            return 'Montreal Canadiens';
        case 'St. Louis Blues':
            return 'St.Louis Blues';
        default:
            return teamName;
    }
};

export class PinnacleService implements OddsService {

    public static getInstance = (): PinnacleService => {
        if (!pinnacleService) {
            pinnacleService = new PinnacleService();
        }
        return pinnacleService;
    }

    private NHL_LEAGUE_IDS = [
        {
            id: 1460,
            name: 'NHL OT Included',
        },
        {
            id: 1461,
            name: 'NHL Regular Time',
        },
        // {
        //     id: 5445,
        //     name: 'NHL OT Included Alternates',
        // },
    ];

    public addOddsForGames = async (games: ExtendedBoxScoreSchemaDocumentType[], user: UserEntity): Promise<ExtendedBoxScoreSchemaDocumentType[]> => {
        try {
            const req = await axios.get('https://api.pinnacle.com/v1/fixtures?sportId=19&leagueIds=' + this.NHL_LEAGUE_IDS.map((l) => l.id).join(','), { headers: { Accept: 'application/json', ...this.createAuthHeader(user) } });
            const parentIds: number[] = [];
            const eventIdGameMap: {
                [eventId: number]: ExtendedBoxScoreSchemaDocumentType,
            } = {};

            req.data.league.forEach((league) => {
                league.events.forEach((event) => {
                    const relatedGame = games.filter((game) => {
                        return game.gameData.datetime.dateTime.getTime() === subMinutes(new Date(event.starts), 8).getTime() && getNormalizedTeamName(game.gameData.teams.home.name) === event.home;
                    })[0];

                    if (relatedGame) {
                        const id = event.id;
                        eventIdGameMap[id] = relatedGame;
                        parentIds.push(id);
                    }
                });
            });

            const odds = await axios.get('https://api.pinnacle.com/v1/odds?sportId=19&oddsFormat=Decimal&eventIds=' + parentIds.join(',') , { headers: { Accept: 'application/json', ...this.createAuthHeader(user) } });

            const gamePkOddsMap: {
                [gamePk: number]: GameOddsAndResults[],
            } = {};

            odds.data.leagues.forEach((league) => {
                league.events.forEach((event) => {
                    const relatedGame = eventIdGameMap[event.id];
                    if (relatedGame) {
                        if  (!gamePkOddsMap[relatedGame.gamePk]) {
                            gamePkOddsMap[relatedGame.gamePk] = [];
                        }
                        // OT INCLUDED
                        if (league.id === 1460) {
                            const period = event.periods.filter((p) => p.number === 0)[0];
                            if (period) {
                                gamePkOddsMap[relatedGame.gamePk].push({
                                    awayOdds: period.moneyline.away * 100,
                                    homeOdds: period.moneyline.home * 100,
                                    source: 'pinnacle',
                                    bookMakerId: event.id,
                                    updatedAt: new Date().getTime(),
                                    gameName: '12',
                                });
                            }
                        }
                        // REGULAR ONLY
                        if (league.id === 1461) {
                            const period = event.periods.filter((p) => p.number === 0)[0];
                            if (period) {
                                gamePkOddsMap[relatedGame.gamePk].push({
                                    awayOdds: period.moneyline.away * 100,
                                    homeOdds: period.moneyline.home * 100,
                                    drawOdds: period.moneyline.draw * 100,
                                    source: 'pinnacle',
                                    bookMakerId: event.id,
                                    updatedAt: new Date().getTime(),
                                    gameName: '1X2',
                                });
                            }

                        }
                    }
                });

            });

            await Promise.all([
                ... Object.keys(gamePkOddsMap).map(async (key) => {
                    const game = games.filter((g) => g.gamePk.toString() === key)[0];
                    if (game) {
                        game.odds = game.odds.filter((s) => s.source !== 'pinnacle');
                        game.odds.push(...gamePkOddsMap[key]);
                    }
                    return game.save();
                }),
            ]);
            return Promise.resolve(games);

        } catch (err) {
            logger.error('pinacle failed ' + err);
        }

        return Promise.resolve([]);
    }

    private createAuthHeader = (user: UserEntity) => {
        return {
            Authorization: `Basic ${Buffer.from(user.pinnacleLogin + ':' + user.pinnaclePass).toString('base64')}`,
        };
    }

}
