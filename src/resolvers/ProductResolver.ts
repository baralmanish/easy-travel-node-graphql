import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";
import { CreateProductInput, Product, UpdateProductInput } from "../entity/Product";

@Resolver(() => Product)
export class ProductResolver {
  private productRepository = AppDataSource.getRepository(Product);
  private categoryRepository = AppDataSource.getRepository(Category);

  @Query(() => [Product])
  async products(@Arg("categoryId", { nullable: true }) categoryId?: number): Promise<Product[]> {
    if (categoryId) {
      return this.productRepository.find({ where: { category: { id: categoryId } }, relations: ["category"] });
    }
    return this.productRepository.find({ relations: ["category"] });
  }

  @Query(() => Product)
  async getProductById(@Arg("id", () => Int) id: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number): Promise<boolean> {
    await this.productRepository.delete(id);
    return true;
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data") data: CreateProductInput): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({ id: data.categoryId });
    if (!category) {
      throw new Error("Category not found");
    }

    // Destructure fields from data object
    const { name, description, price, isActive, date, location } = data;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.isActive = isActive ?? true;
    product.category = category;
    if (date !== undefined) product.date = new Date(date);
    if (location !== undefined) product.location = location;

    return this.productRepository.save(product);
  }

  @Mutation(() => Product)
  async updateProduct(@Arg("id", () => Int) id: number, @Arg("data") data: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error("Product not found");
    }

    if (data.categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: data.categoryId });
      if (!category) {
        throw new Error("Category not found");
      }

      product.category = category;
    }

    // Destructure fields from data object
    const { name, description, price, isActive, date, location } = data;

    // Update fields only if they are defined
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (isActive !== undefined) product.isActive = isActive;
    if (date !== undefined) product.date = new Date(date);
    if (location !== undefined) product.location = location;

    return await this.productRepository.save(product);
  }
}
