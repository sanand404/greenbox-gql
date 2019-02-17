import rootQuery from './rootQuery';
import rootMutation from './rootMutation';

const resolver = {
  Query: {
    ...rootQuery
  },
  Mutation: {
    ...rootMutation
  }
};

export default resolver;
