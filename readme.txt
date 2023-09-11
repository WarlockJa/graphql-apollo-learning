GraphQL - Query Language alternative to REST API

    Queries
Apollo explorer - query tester for Apollo (https://www.apollographql.com/docs/graphos/explorer/sandbox/)
(https://graphqlzero.almansi.me/api - dummy server)

    Setup (Installing Apollo GraphQL)
https://www.apollographql.com/docs/apollo-server/getting-started
npm init --yes && npm pkg set type="module"
npm install @apollo/server graphql

    Setting up TS (https://www.apollographql.com/docs/apollo-server/getting-started/)
mkdir src
touch src/index.ts
npm install --save-dev typescript @types/node
touch tsconfig.json (fill the file)
Finally, replace the default scripts entry in your package.json file with the following type and scripts entries:
    "type": "module",
    "scripts": {
        "compile": "tsc",
        "start": "npm run compile && node ./dist/index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    }

    Create Apollo Server instance: src/index.ts -> #server setup
accepts and object {
    typeDefs    - type definitions: descriptions of data types and their relationships with other data types
    resolvers   - resolver functions: define how we respond to queries for different data on the graph
}

    Syntax Highlighing
Find an extention: GraphQL Syntax Highlighing by GraphQL Foundation

    Creating Schema
code wrapper inside `#graphql ...` will have its syntax highlighted
five basic types used by GraphQL: int, float, string, boolean, ID(special type)

defining types for tables, Query (GET request), Mutation(rest of the CRUD). inputs are subtypes used for brewity

at src/index.ts import typeDefs from schema and pass it to Apollo server instance

    Generating types based on Schema (https://www.apollographql.com/docs/apollo-server/workflow/generate-types)
- rename schema.js to schema.graphql. Remove export syntax leaving only types
- updating imports in index.ts using readFileSync from 'fs'. NOTE: path used is relative to the root
- test that everything works
- installing dependencies:
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
- Next, we'll set up a configuration file to tell GraphQL Code Generator where and how to generate types. You can do this by manually creating a codegen.yml file or by using the following command, which walks you through the process:
npx graphql-code-generator init
- add a combination command to packakge.json "compile": "npm run codegen && tsc", to automate TS generation
    
    Adding types to resolvers
- importing Resolvers type to src/index.ts - This provides data types to the resolvers input