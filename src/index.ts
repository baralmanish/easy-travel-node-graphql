import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { AppDataSource } from "./data-source";
import { OrderResolver } from "./resolvers/OrderResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";

async function startServer() {
  // Initialize TypeORM data source
  await AppDataSource.initialize();

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [CategoryResolver, ProductResolver, OrderResolver],
  });

  // Create Apollo Server instance
  const server = new ApolloServer({
    schema,
  });

  // Start the server
  await server.start();

  // Create an Express application
  const app = express();
  app.get("/", function (_req, res) {
    res.send("Welcome to easy-travel-server");
  });

  // Use Apollo Server middleware with Express
  app.use("/graphql", bodyParser.json(), expressMiddleware(server));

  // Start the Express server
  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

startServer().catch(error => {
  // eslint-disable-next-line no-console
  console.error("Server failed to start", error);
});
