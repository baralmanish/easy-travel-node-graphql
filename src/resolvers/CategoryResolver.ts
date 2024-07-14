import { Arg, Int, Query, Resolver } from "type-graphql";

import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";

@Resolver(() => Category)
export class CategoryResolver {
  private categoryRepository = AppDataSource.getRepository(Category);

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoryRepository.find({ cache: 1000 });
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id", () => Int) id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { id }, cache: 1000 });
  }
}
