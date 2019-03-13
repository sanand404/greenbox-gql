import { graphqlLambda } from 'graphql-server-lambda';
import schema from '../../graphql/rootSchema';

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
