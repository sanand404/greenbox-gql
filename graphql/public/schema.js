import { gql } from 'apollo-server';

const typeDefs = gql`
     type Team {
        idTeam: ID!
        teamName: String!
        teamFlag: String
        isActive(active: Boolean): Boolean
        teamCreatedAt: String,
        teamUpdatedAt: String
    }

    type Query{
        team: [Team]
    }
`;

export default typeDefs;
