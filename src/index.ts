import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { AppResolvers } from "./database";
import { AppDataSource } from "./data-source";

async function startServer() {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AppResolvers],
  });

  const server = new ApolloServer({
    schema,
  });
  await server.start();

  const app = express();
  app.get("/", function (_req, res) {
    res.send("Welcome to easy-travel-server");
  });
  app.use("/graphql", bodyParser.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
}

startServer();
