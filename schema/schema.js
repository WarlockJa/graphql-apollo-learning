export const typeDefs = `#graphql
    type Game {
        # ! - means the field is required
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    # required for every GraphQL schema. Describes the entry point
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
`;

// five basic types used by GraphQL
// int, float, string, boolean, ID
