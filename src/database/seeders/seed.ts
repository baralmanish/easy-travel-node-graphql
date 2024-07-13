import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category";
import { AppDataSource } from "../../data-source";

async function seed() {
  // Create connection
  const connection = await AppDataSource.initialize();

  const categoryRepository = connection.getRepository(Category);
  const productRepository = connection.getRepository(Product);

  // Create categories
  const category1 = categoryRepository.create({ name: "Flights" });
  const category2 = categoryRepository.create({ name: "Hotels" });
  const category3 = categoryRepository.create({ name: "Car Rentals" });
  await categoryRepository.save([category1, category2, category3]);

  // Create products
  const product1 = productRepository.create({
    name: "Flight from Hamburg to Berlin",
    description: "A flight ticket from Hamburg to Berlin",
    price: 199.99,
    quantity: 10,
    isActive: true,
    category: Promise.resolve(category1),
  });
  const product2 = productRepository.create({
    name: "Hotel stay in Berlin",
    description: "A luxurious hotel stay in Berlin",
    price: 399.99,
    quantity: 5,
    isActive: true,
    category: Promise.resolve(category2),
  });
  const product3 = productRepository.create({
    name: "Car rental in Berlin",
    description: "A car rental in Berlin for a week",
    price: 149.99,
    quantity: 20,
    isActive: true,
    category: Promise.resolve(category3),
  });
  await productRepository.save([product1, product2, product3]);

  // Destroy connection
  await connection.destroy();
}

seed().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);

  process.exit(1);
});
