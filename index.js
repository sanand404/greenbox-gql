import { ApolloServer } from 'apollo-server-lambda';
import 'dotenv/config';
// import typeDefs from './src/schema';
// import resolver from './src/resolvers';
// import lambdaPlayground from 'graphql-playground-middleware-lambda';
import typeDefs from './graphql/public/schema';
import resolver from './graphql/rootSchema';

const server = new ApolloServer({ typeDefs, resolvers: resolver });

// if (!process.env.IS_OFFLINE) {
//   server.listen({ port: 7000 }).then(({ url }) => {
//     console.log('Server started ', url);
//   });
// }

// exports.playgroundHandler = lambdaPlayground({
//   endpoint: (process.env.IS_OFFLINE) ? 'http://localhost:5000/graphql' : process.env.GRAPHQL_URL
// });

exports.handler = server.createHandler();
