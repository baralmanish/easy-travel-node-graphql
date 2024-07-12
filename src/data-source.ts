import "reflect-metadata";
import { DataSource } from "typeorm";

import { Product } from "./database/entity/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "easytravel",
  database: "easytravel",
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
});
