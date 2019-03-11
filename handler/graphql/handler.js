import { graphqlLambda } from 'graphql-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import schema from '../../graphql/rootSchema';
import logger from '../../lib/logging/loggingService';

exports.playgroundHandler = lambdaPlayground({
  endpoint: (process.env.IS_OFFLINE) ? 'http://localhost:5000/graphql' : process.env.GRAPHQL_URL
});

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const body = JSON.parse(output.body);
    callback(error, body);
  };

  const handler = graphqlLambda((innerEvent, innerContext) => {
    const user = null;

    return {
      schema,
      context: {
        ...innerEvent,
        ...innerContext,
        user
      }
    };
  });

  return handler({
    ...event,
    httpMethos: event.method
  }, context, callbackFilter);
};
