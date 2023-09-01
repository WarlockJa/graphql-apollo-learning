import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
// types
import { typeDefs } from "../schema/schema.js";
// db
import db from "../db/_db.js";

const resolvers = {
  // a set of functions for the type Query defines in schema
  Query: {
    // we only define where the data is stored in the db. Apollo handles granular request for fields
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    // query accepts three arguments parent, args, and context
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  // typeDefs type definitions: descriptions of data types and their relationships with other data types
  typeDefs,
  // resolvers resolver functions: define how we respond to queries for different data on the graph
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: Number(process.env.PORT),
  },
});

console.log("Server ready at port ", process.env.PORT);
