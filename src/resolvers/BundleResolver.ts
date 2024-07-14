import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";

import { Bundle } from "../entity/Bundle";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { In } from "typeorm";

@Resolver()
export class BundleResolver {
  private bundleRepository = AppDataSource.getRepository(Bundle);
  private productRepository = AppDataSource.getRepository(Product);

  @Query(() => [Bundle])
  async bundles(): Promise<Bundle[]> {
    return await this.bundleRepository.find({ relations: ["products"] });
  }

  @Query(() => Bundle, { nullable: true })
  async bundle(@Arg("id", () => Int) id: number): Promise<Bundle | undefined> {
    const bundle = await this.bundleRepository.findOne({
      where: { id },
      relations: ["products"],
    });
    return bundle || undefined;
  }

  @Mutation(() => Bundle)
  async createBundle(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price", () => Int) price: number,
    @Arg("productIds", () => [Int]) productIds: number[]
  ): Promise<Bundle> {
    // const products = await this.productRepository.findByIds(productIds);
    const products = await this.productRepository.findBy({ id: In(productIds) });
    const bundle = this.bundleRepository.create({ name, description, price, products });
    return await this.bundleRepository.save(bundle);
  }

  @Mutation(() => Bundle, { nullable: true })
  async updateBundle(
    @Arg("id", () => Int) id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("price", () => Int, { nullable: true }) price?: number,
    @Arg("productIds", () => [Int], { nullable: true }) productIds?: number[]
  ): Promise<Bundle | undefined> {
    const bundle = await this.bundleRepository.findOne({
      where: { id },
      relations: ["products"],
    });
    if (!bundle) {
      throw new Error("Bundle not found");
    }

    if (name) bundle.name = name;
    if (description) bundle.description = description;
    if (price) bundle.price = price;
    if (productIds) {
      // const products = await this.productRepository.findByIds(productIds);
      const products = await this.productRepository.findBy({ id: In(productIds) });
      bundle.products = products;
    }

    return await this.bundleRepository.save(bundle);
  }

  @Mutation(() => Boolean)
  async deleteBundle(@Arg("id", () => Int) id: number): Promise<boolean> {
    const result = await this.bundleRepository.delete(id);
    return result.affected !== 0;
  }
}
