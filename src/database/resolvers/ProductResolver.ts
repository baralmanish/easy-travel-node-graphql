import { Resolver, Query, Arg } from "type-graphql";

import { Product } from "../entity/Product";
import { AppDataSource } from "../../data-source";

@Resolver()
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
}
