import { gql } from 'apollo-server';

const typeDefs = gql`
     type Team {
        idTeam: ID!
        teamName: String!
        teamFlag: String
        isActive: Boolean
        teamCreatedAt: String,
        teamUpdatedAt: String
    }

    input TeamInput {
        teamName: String!,
        teamFlag: String
        isActive: Boolean
    }

    type Query {
        team: [Team]
    }

    type Mutation {
        upsertTeam(teamDetails: TeamInput!): [Team]
    }
`;

export default typeDefs;
