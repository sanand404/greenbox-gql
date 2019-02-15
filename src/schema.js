import { gql } from 'apollo-server';

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPath(size: PathSize): String
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Post {
    id: ID!
    authorId: Int
    title: String
    votes: Int
    year: Int
  }

  enum PathSize {
    SMALL
    LARGE
  }

  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    post: [Post]
    # Queries for the current user
    me: User
  }

  type Mutation {
    # if false, booking trips failed --check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false cancellation failes --check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String #login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;


export default typeDefs;