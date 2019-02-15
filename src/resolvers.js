import launchResolver from './launchResolver';

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2, year: 2018 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3, year: 2019 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1, year: 2013 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7, year: 2011 },
];

const resolvers = {
  Query: {
    post: () => {
      return posts;
    },
    ...launchResolver
  }
};

export default resolvers;