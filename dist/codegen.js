const config = {
    overwrite: true,
    schema: "./schema/schema.graphql",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        }
    }
};
export default config;
