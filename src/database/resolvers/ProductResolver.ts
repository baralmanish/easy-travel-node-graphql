import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput, Product, UpdateProductInput } from "../entity/Product";
import { AppDataSource } from "../../data-source";

@Resolver(() => Product)
export class ProductResolver {
  private productRepository = AppDataSource.getRepository(Product);

  @Query(() => [Product])
  async products() {
    return this.productRepository.find();
  }

  @Query(() => Product, { nullable: true })
  async product(@Arg("id") id: number) {
    return this.productRepository.findOneBy({ id });
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data") data: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  @Mutation(() => Product)
  async updateProduct(@Arg("id") id: number, @Arg("data") data: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error("Product not found");
    }
    Object.assign(product, data);
    return await this.productRepository.save(product);
  }

  @Mutation(() => Boolean)
  async removeProduct(@Arg("id") id: number) {
    await this.productRepository.delete(id);
    return true;
  }
}
