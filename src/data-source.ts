import "reflect-metadata";
import { DataSource } from "typeorm";

import { Product } from "./entity/Product";
import { Category } from "./entity/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "easytravel",
  database: "easytravel",
  synchronize: true,
  logging: false,
  entities: [Category, Product],
  migrations: ["database/migrations/*.ts"],
  subscribers: [],
});
