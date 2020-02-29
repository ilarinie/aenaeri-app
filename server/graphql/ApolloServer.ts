import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import ExtendedBoxScoreSchema from '../db/mongo/ExtendedBoxScoreSchema';
import logger from '../logger';
import { BoxScoreTypes } from './schemas/BoxScoreType';
import { Exasd } from './schemas/ExtendedBoxScore';

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        boxScores: async (parent, { from, to }, context, info) => {
            logger.info(JSON.stringify({ $gt: new Date(parseInt(from)), $lt: new Date(parseInt(to)) }, null, 2));
            return await ExtendedBoxScoreSchema.find({ 'gameData.datetime.dateTime': { $gt: new Date(parseInt(from)), $lt: new Date(parseInt(to)) } });
        },
    },
    ExtendedBoxScore: {
        odds(boxScore, { gameNames }, urgs, durks) {
            return boxScore.odds.filter((s) => gameNames.includes(s.gameName));
        },
    },
};

const schema = makeExecutableSchema({
    typeDefs: [Exasd, BoxScoreTypes],
    resolvers,
});

const NHLApolloServer = new ApolloServer(
    {
        schema,
        playground: true,
    },
);

export default (app) => {
    NHLApolloServer.applyMiddleware({ app });
};
