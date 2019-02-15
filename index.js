import { ApolloServer, gql } from 'apollo-server';
import typeDefs from './src/schema';
import resolver from './src/resolvers';

const server = new ApolloServer({ typeDefs, resolvers:resolver});
server.listen({ port:3000 }).then(({ url }) => {
  console.log("Server started ", url);
});