import { ExtendedBoxScore } from '../../server/models/ExtendedBoxScoreType/index';

export const ExtendedBoxScoreMock: ExtendedBoxScore = {
    gameData: {
        datetime: {
            dateTime: new Date('2020-02-22T00:00:00.000Z'),
        },
        status: {
            abstractGameState: 'Preview',
            codedGameState: '1',
            detailedState: 'Scheduled',
            statusCode: '1',
            startTimeTBD: false,
        },
        teams: {
            away: {
                venue: {
                    timeZone: {
                        id: 'America/New_York',
                        offset: -5,
                        tz: 'EST',
                    },
                    id: 5054,
                    name: 'Madison Square Garden',
                    link: '/api/v1/venues/5054',
                    city: 'New York',
                },
                division: {
                    id: 18,
                    name: 'Metropolitan',
                    nameShort: 'Metro',
                    link: '/api/v1/divisions/18',
                    abbreviation: 'M',
                },
                conference: {
                    id: 6,
                    name: 'Eastern',
                    link: '/api/v1/conferences/6',
                },
                franchise: {
                    franchiseId: 10,
                    teamName: 'Rangers',
                    link: '/api/v1/franchises/10',
                },
                id: 3,
                name: 'New York Rangers',
                link: '/api/v1/teams/3',
                abbreviation: 'NYR',
                triCode: 'NYR',
                teamName: 'Rangers',
                locationName: 'New York',
                firstYearOfPlay: '1926',
                shortName: 'NY Rangers',
                officialSiteUrl: 'http://www.newyorkrangers.com/',
                franchiseId: 10,
                active: true,
            },
            home: {
                venue: {
                    timeZone: {
                        id: 'America/New_York',
                        offset: -5,
                        tz: 'EST',
                    },
                    id: 5066,
                    name: 'PNC Arena',
                    link: '/api/v1/venues/5066',
                    city: 'Raleigh',
                },
                division: {
                    id: 18,
                    name: 'Metropolitan',
                    nameShort: 'Metro',
                    link: '/api/v1/divisions/18',
                    abbreviation: 'M',
                },
                conference: {
                    id: 6,
                    name: 'Eastern',
                    link: '/api/v1/conferences/6',
                },
                franchise: {
                    franchiseId: 26,
                    teamName: 'Hurricanes',
                    link: '/api/v1/franchises/26',
                },
                id: 12,
                name: 'Carolina Hurricanes',
                link: '/api/v1/teams/12',
                abbreviation: 'CAR',
                triCode: 'CAR',
                teamName: 'Hurricanes',
                locationName: 'Carolina',
                firstYearOfPlay: '1997',
                shortName: 'Carolina',
                officialSiteUrl: 'http://www.carolinahurricanes.com/',
                franchiseId: 26,
                active: true,
            },
        },
        venue: {
            name: 'PNC Arena',
            link: '/api/v1/venues/5066',
        },
        game: {
            pk: 2019020942,
            season: '20212022',
            type: 'R',
        },
        players: {
        },
    },
    liveData: {

        plays: {
            allPlays: [],
            scoringPlays: [],
            penaltyPlays: [],
            playsByPeriod: [],
        },
        boxscore: {

            teams: {

                away:
                {
                    team: {
                        id: 3,
                        name: 'New York Rangers',
                        link: '/api/v1/teams/3',
                        abbreviation: 'NYR',
                        triCode: 'NYR',
                    },
                    teamStats:
                    {
                        teamSkaterStats: {

                            goals: 0,
                            pim: 0,
                            shots: 0,
                            powerPlayPercentage: '0.0',
                            powerPlayGoals: 0,
                            powerPlayOpportunities: 0,
                            faceOffWinPercentage: '0.0',
                            blocked: 0,
                            takeaways: 0,
                            giveaways: 0,
                            hits: 0,

                        },

                    },
                    goalies: [],
                    skaters: [],
                    onIce: [],
                    onIcePlus: [],
                    scratches: [],
                    penaltyBox: [],
                    coaches: [],
                    players: {

                    },

                },
                home: {

                    team: {
                        id: 12,
                        name: 'Carolina Hurricanes',
                        link: '/api/v1/teams/12',
                        abbreviation: 'CAR',
                        triCode: 'CAR',
                    },
                    teamStats: {

                        teamSkaterStats: {

                            goals: 0,
                            pim: 0,
                            shots: 0,
                            powerPlayPercentage: '0.0',
                            powerPlayGoals: 0,
                            powerPlayOpportunities: 0,
                            faceOffWinPercentage:
                                '0.0',
                            blocked: 0,
                            takeaways: 0,
                            giveaways: 0,
                            hits: 0,
                        },
                    },
                    goalies: [],
                    skaters: [],
                    onIce: [],
                    onIcePlus: [],
                    scratches: [],
                    penaltyBox: [],
                    coaches: [],
                    players: {
                    },
                },
            },
            officials: [],
        },
    },
    copyright: 'NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2020. All Rights Reserved.',
    gamePk: 2019020942,
    link: '/api/v1/game/2019020942/feed/live',
    odds: [
        {
            homeOdds: 240,
            awayOdds: 250,
            drawOdds: 390,
            gameName: '1X2',
            updatedAt: 1582656965510,
            source: 'veikkaus',
            bookMakerId: '1950485',
        },
        {
            homeOdds: 183,
            awayOdds: 190,
            gameName: '12',
            updatedAt: 1582656965511,
            source: 'veikkaus',
            bookMakerId: '1961049',
        },
        {
            homeOdds: 320,
            awayOdds: 148,
            drawOdds: 740,
            gameName: 'AWAY_HANDICAP+1',
            updatedAt: 1582656965511,
            source: 'veikkaus',
            bookMakerId: '1961050',
        },
        {
            homeOdds: 500,
            awayOdds: 125,
            drawOdds: 800,
            gameName: 'AWAY_HANDICAP+2',
            updatedAt: 1582656965512,
            source: 'veikkaus',
            bookMakerId: '1961051',
        },
        {
            homeOdds: 145,
            awayOdds: 335,
            drawOdds: 760,
            gameName: 'HOME_HANDICAP+1',
            updatedAt: 1582656965512,
            source: 'veikkaus',
            bookMakerId: '1961052',
        },
        {
            homeOdds: 123,
            awayOdds: 530,
            drawOdds: 840,
            gameName: 'HOME_HANDICAP+2',
            updatedAt: 1582656965512,
            source: 'veikkaus',
            bookMakerId: '1961053',
        },
        {
            awayOdds: 269,
            homeOdds: 240,
            drawOdds: 392,
            source: 'pinnacle',
            bookMakerId: '1105689854',
            gameName: '1X2',
            updatedAt: 1123,
        },
        {
            awayOdds: 201,
            homeOdds: 189,
            source: 'pinnacle',
            bookMakerId: '1105331441',
            gameName: '12',
            updatedAt: 2323,
        },
    ],

};
