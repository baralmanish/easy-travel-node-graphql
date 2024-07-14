import "reflect-metadata";
import { DataSource } from "typeorm";

import { Order } from "./entity/Order";
import { Bundle } from "./entity/Bundle";
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
  logging: true,
  entities: [Category, Order, Product, Bundle],
  migrations: ["./database/migrations/*.ts"],
  subscribers: [],
});
