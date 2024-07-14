import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";

@Resolver(() => Order)
export class OrderResolver {
  private orderRepository = AppDataSource.getRepository(Order);
  private productRepository = AppDataSource.getRepository(Product);

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ["product"] });
  }

  @Mutation(() => Order)
  async placeOrder(
    @Arg("productId") productId: number,
    @Arg("customerName") customerName: string,
    @Arg("customerEmail") customerEmail: string
  ): Promise<Order> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new Error("Product not found");

    const order = this.orderRepository.create({
      customerName,
      customerEmail,
      orderDate: new Date().toISOString(),
      product,
    });

    return this.orderRepository.save(order);
  }
}
