import { ApolloServer } from 'apollo-server-lambda';
// import 'dotenv/config';
import typeDefs from './graphql/public/schema';
import resolver from './graphql/rootSchema';

require('dotenv').config({ path: './.env' });

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  introspection: true,
  playground: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler();
