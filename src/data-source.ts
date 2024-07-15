import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { Order } from "./entity/Order";
import { Bundle } from "./entity/Bundle";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [Category, Order, Product, Bundle],
  migrations: ["./database/migrations/*.ts"],
  subscribers: [],
});
