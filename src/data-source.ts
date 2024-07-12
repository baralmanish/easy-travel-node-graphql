import "reflect-metadata";
import { DataSource } from "typeorm";

import { Product } from "./database/entity/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
