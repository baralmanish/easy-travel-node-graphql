import { faker } from "@faker-js/faker";

import { Bundle } from "../../entity/Bundle";
import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category";
import { AppDataSource } from "../../data-source";
import { getDiscountedPrice } from "../../helpers/utility";

async function seed() {
  // Create connection
  const connection = await AppDataSource.initialize();

  const bundleRepository = connection.getRepository(Bundle);
  const productRepository = connection.getRepository(Product);
  const categoryRepository = connection.getRepository(Category);

  // Clear existing data
  await connection.query('TRUNCATE TABLE "order" CASCADE');
  await connection.query('TRUNCATE TABLE "product" CASCADE');
  await connection.query('TRUNCATE TABLE "bundle" CASCADE');
  await connection.query('TRUNCATE TABLE "category" CASCADE');

  // Seed Categories
  const categories = ["Flight", "Hotel", "Car Rental"].map(name => {
    const category = new Category();
    category.name = name;
    return category;
  });
  await categoryRepository.save(categories);

  // Seed Products
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = new Product();
    product.name = faker.commerce.productName();
    product.description = faker.lorem.sentences();
    product.price = parseFloat(faker.commerce.price());
    product.date = faker.date.future();
    product.location = faker.location.city();
    product.isActive = faker.helpers.arrayElement([true, false]);
    product.category = faker.helpers.arrayElement(categories);
    products.push(product);
  }
  await productRepository.save(products);

  // Seed Bundles
  const bundles = [];
  for (let i = 0; i < 3; i++) {
    const bundle = new Bundle();
    const bundleProducts = faker.helpers.arrayElements(products, 3);
    const bundlePrice = bundleProducts.reduce((total, curProduct) => {
      return total + curProduct.price;
    }, 0);
    const discountNum = faker.number.int({ min: 1, max: 10 });

    bundle.name = `Bundle ${i + 1}`;
    bundle.description = faker.lorem.sentences();
    bundle.price = parseFloat(`${getDiscountedPrice(bundlePrice, discountNum)}`);
    bundle.products = bundleProducts;
    bundles.push(bundle);
  }
  await bundleRepository.save(bundles);

  // eslint-disable-next-line no-console
  console.log("Seeding completed!");
  await connection.destroy();
}

// eslint-disable-next-line no-console
seed().catch(error => console.log(error));
