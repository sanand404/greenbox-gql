import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
     type Team {
        id: ID!
        name: String
        flag: String
        isActive: Boolean
        createdAt: String
        updatedAt: String
    }

    input TeamInput {
        name: String!
        flag: String
        isActive: Boolean
    }

    type Query{
        team: [Team]
        listTeam: [Team]
    }

    type Mutation{
        createTeam(input: TeamInput): Team
    }
`;

export default typeDefs;
