import { DataSource } from "typeorm";
import { buildSchema } from "type-graphql";
import { graphql, GraphQLSchema } from "graphql";

import { Order } from "../entity/Order";
import { Bundle } from "../entity/Bundle";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";
import { OrderResolver } from "./OrderResolver";

let schema: GraphQLSchema;
let connection: DataSource;

beforeAll(async () => {
  connection = await AppDataSource.initialize();
  await connection.query('TRUNCATE TABLE "order" CASCADE');
  await connection.query('TRUNCATE TABLE "product" CASCADE');
  await connection.query('TRUNCATE TABLE "bundle" CASCADE');
  await connection.query('TRUNCATE TABLE "category" CASCADE');

  schema = await buildSchema({
    resolvers: [OrderResolver],
  });
});

afterAll(async () => {
  await connection.destroy();
});

describe("OrderResolver", () => {
  it("should create an order with a product", async () => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = new Category();
    category.name = "Test Category";
    await categoryRepository.save(category);

    const productRepository = AppDataSource.getRepository(Product);
    const product = new Product();
    product.name = "Test Product";
    product.description = "Test Description";
    product.price = 100;
    product.location = "Test Location";
    product.category = category;
    await productRepository.save(product);

    const mutation = `
      mutation {
        createOrder(
          customerName: "John Doe",
          customerEmail: "john.doe@example.com",
          productId: ${product.id}
        ) {
          id
          customerName
          customerEmail
          product {
            id
            name
            category {
              id
              name
            }
          }
        }
      }
    `;

    const { data, errors } = await graphql({
      schema,
      source: mutation,
    });

    expect(errors).toBeUndefined();

    const order = data!.createOrder as Order;
    expect(order!.customerName).toBe("Jane Doe");
    expect(order!.customerEmail).toBe("jane.doe@example.com");
    expect(order!.product.id).toBe(product.id.toString());
    expect(order!.product.name).toBe("Test Product");
    expect(order!.product.category.name).toBe("Test Category");
  });

  it("should create an order with a bundle", async () => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = new Category();
    category.name = "Test Category";
    await categoryRepository.save(category);

    const productRepository = AppDataSource.getRepository(Product);
    const product = new Product();
    product.name = "Test Product";
    product.description = "Test Description";
    product.price = 100;
    product.category = category;
    await productRepository.save(product);

    const bundleRepository = AppDataSource.getRepository(Bundle);
    const bundle = new Bundle();
    bundle.name = "Test Bundle";
    bundle.description = "Test Bundle Description";
    bundle.price = 200;
    bundle.products = [product];
    await bundleRepository.save(bundle);

    const mutation = `
      mutation {
        createOrder(
          customerName: "Jane Doe",
          customerEmail: "jane.doe@example.com",
          bundleId: ${bundle.id}
        ) {
          id
          customerName
          customerEmail
          bundle {
            id
            name
          }
        }
      }
    `;

    const { data, errors } = await graphql({
      schema,
      source: mutation,
    });

    expect(errors).toBeUndefined();

    const order = data!.createOrder as Order;
    expect(order!.customerName).toBe("Jane Doe");
    expect(order!.customerEmail).toBe("jane.doe@example.com");
    expect(order!.bundle!.id).toBe(bundle.id.toString());
    expect(order!.bundle!.name).toBe("Test Bundle");
  });

  it("should fetch a single order by id", async () => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = new Category();
    category.name = "Test Category";
    await categoryRepository.save(category);

    const productRepository = AppDataSource.getRepository(Product);
    const product = new Product();
    product.name = "Test Product";
    product.description = "Test Description";
    product.price = 100;
    product.category = category;
    await productRepository.save(product);

    const orderRepository = AppDataSource.getRepository(Order);
    const order = new Order();
    order.customerName = "Last User";
    order.customerEmail = "last.user@example.com";
    order.product = product;
    await orderRepository.save(order);

    const query = `
      query {
        order(id: ${order.id}) {
          id
          customerName
          customerEmail
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
    });
    expect(result.errors).toBeUndefined();

    const orderRes = result.data!.order as Order;
    expect(orderRes!.customerName).toBe(order.customerName);
    expect(orderRes!.customerEmail).toBe(order.customerEmail);
  });
});
