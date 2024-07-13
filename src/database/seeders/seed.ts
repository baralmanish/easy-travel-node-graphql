import { Product } from "../../entity/Product";
import { Category } from "../../entity/Category";
import { AppDataSource } from "../../data-source";
import { addDaysToDate, getTodayDate } from "../../helpers/utility";

async function seed() {
  // Create connection
  const connection = await AppDataSource.initialize();

  // Start seeding data
  try {
    // Seed categories
    const categoryRepository = connection.getRepository(Category);
    const categories = await categoryRepository.save([
      { name: "Flights" },
      { name: "Hotels" },
      { name: "Car Rentals" },
    ]);

    // Seed products
    const productRepository = connection.getRepository(Product);
    await productRepository.save([
      {
        name: "Flight from Hamburg to Berlin",
        description: "A flight ticket from Hamburg to Berlin",
        price: 199.99,
        isActive: true,
        date: getTodayDate(),
        location: "Hamburg",
        category: categories[0],
      },
      {
        name: "Hotel stay in Berlin",
        description: "A luxurious hotel stay in Berlin",
        price: 399.99,
        isActive: true,
        date: getTodayDate(),
        location: "Berlin",
        category: categories[1],
      },
      {
        name: "Car rental in Berlin",
        description: "A car rental in Berlin for a week",
        price: 149.99,
        isActive: true,
        date: getTodayDate(),
        location: "Berlin",
        category: categories[2],
      },
      {
        name: "Flight from Berlin to Hamburg",
        description: "A flight ticket from Berlin to Hamburg",
        price: 259.99,
        isActive: true,
        date: addDaysToDate(7),
        location: "Hamburg",
        category: categories[0],
      },
    ]);

    // eslint-disable-next-line no-console
    console.log("Seeding completed successfully.");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection after seeding
    await connection.destroy();
  }
}

seed();
