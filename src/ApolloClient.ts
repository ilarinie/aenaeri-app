import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
    uri: '/api/graphql',
});
