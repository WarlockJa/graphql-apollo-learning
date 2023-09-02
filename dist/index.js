import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import crypto from "crypto";
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
    // in order to resolve nested objects inside of the graph query
    // we make resolver functions according to their description in the schema
    Game: {
        // parent argument defines the parent of the nested object
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id);
        },
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        },
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id);
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id);
        },
    },
    // resolvers for mutations defines in schema
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id);
            return db.games;
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: crypto.randomUUID(), // generating random uuid
            };
            db.games.push(game);
            return game;
        },
        updateGame(_, args) {
            // mapping through the games list and updating the one matching the provided id
            db.games = db.games.map((game) => {
                if (game.id === args.id)
                    return { ...game, ...args.edits };
                return game;
            });
            return db.games.find((game) => game.id === args.id);
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
