import { ApolloServer, gql } from 'apollo-server';
// import typeDefs from './src/schema';
// import resolver from './src/resolvers';

import typeDefs from './graphql/public/schema';
import resolver from './graphql/rootSchema';

require('dotenv').config({ path: '../../.env' });

const server = new ApolloServer({ typeDefs, resolvers: resolver });
server.listen({ port: 7000 }).then(({ url }) => {
  console.log('Server started ', url);
});
