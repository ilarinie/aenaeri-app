import axios from 'axios';
import { subMinutes } from 'date-fns';
import fs from 'fs';
import { UserEntity } from '../../db/entities/User';
import { ExtendedBoxScoreSchemaDocumentType } from '../../db/mongo/ExtendedBoxScoreSchema';
import logger from '../../logger';
import { OddsService, OddsType } from '../OddsService';

let pinnacleService;

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
        {
            id: 5445,
            name: 'NHL OT Included Alternates',
        },
    ];

    public addOddsForGames = async (games: ExtendedBoxScoreSchemaDocumentType[], user: UserEntity): Promise<ExtendedBoxScoreSchemaDocumentType[]> => {
        try {
            logger.info(JSON.stringify(this.createAuthHeader(user), null, 2));
            const req = await axios.get('https://api.pinnacle.com/v1/fixtures?sportId=19&leagueIds=' + this.NHL_LEAGUE_IDS.map((l) => l.id).join(','), { headers: { Accept: 'application/json', ...this.createAuthHeader(user) } });
            fs.writeFileSync('fixtures.json', JSON.stringify(req.data, null, 2));
            const parentIds: number[] = [];
            const eventIdGameMap: {
                [eventId: number]: ExtendedBoxScoreSchemaDocumentType[],
            } = {};

            req.data.league.forEach((league) => {
                league.events.forEach((event) => {
                    const relatedGame = games.filter((game) => {
                        return game.gameData.datetime.dateTime.getTime() === subMinutes(new Date(event.starts), 8).getTime() && game.gameData.teams.home.name === event.home && game.gamePk === 2019020961;
                    })[0];

                    if (relatedGame) {
                        const id = event.id;
                        if (!eventIdGameMap[id]) {
                            eventIdGameMap[id] = [];
                        }
                        eventIdGameMap[id].push(relatedGame);
                        parentIds.push(id);
                    }
                });
            });
            logger.info('https://api.pinnacle.com/v1/odds?sportId=19&oddsFormat=Decimal&eventIds=' + parentIds.join(','));

            const odds = await axios.get('https://api.pinnacle.com/v1/odds?sportId=19&oddsFormat=Decimal&eventIds=' + parentIds.join(',') , { headers: { Accept: 'application/json', ...this.createAuthHeader(user) } });
            fs.writeFileSync('odds.json', JSON.stringify(odds.data, null, 2));

        } catch (err) {
            logger.error('pinacle failed ' + err);
        }

        return Promise.resolve([]);
    }

    private createAuthHeader = (user: UserEntity) => {
        return {
            Authorization: `Basic ${new Buffer(user.pinnacleLogin + ':' + user.pinnaclePass).toString('base64')}`,
        };
    }

}
