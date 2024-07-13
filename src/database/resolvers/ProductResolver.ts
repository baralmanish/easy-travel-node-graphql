import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

import { Category } from "../entity/Category";
import { AppDataSource } from "../../data-source";
import { Product, UpdateProductInput } from "../entity/Product";

@Resolver(() => Product)
export class ProductResolver {
  private productRepository = AppDataSource.getRepository(Product);
  private categoryRepository = AppDataSource.getRepository(Category);

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Arg("id", () => Int) id: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("quantity", () => Int) quantity: number,
    @Arg("isActive", { defaultValue: true }) isActive: boolean,
    @Arg("categoryId", () => Int) categoryId: number
  ): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error("Category not found");
    }

    const product = this.productRepository.create({ name, description, price, quantity, isActive });
    product.category = Promise.resolve(category);
    return await this.productRepository.save(product);
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

      product.category = Promise.resolve(category);
    }
    Object.assign(product, data);
    return await this.productRepository.save(product);
  }

  @Mutation(() => Boolean)
  async removeProduct(@Arg("id") id: number): Promise<boolean> {
    await this.productRepository.delete(id);
    return true;
  }
}
