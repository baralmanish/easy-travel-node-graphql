import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { OrderStatus } from "../enums/order";

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
    @Arg("customerName") customerName: string,
    @Arg("customerEmail") customerEmail: string,
    @Arg("productId", () => Int) productId: number
  ): Promise<Order> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new Error("Product not found");

    const order = this.orderRepository.create({
      customerName,
      customerEmail,
      product,
    });

    return this.orderRepository.save(order);
  }

  @Mutation(() => Order)
  async updateOrderStatus(
    @Arg("orderId", () => Int) orderId: number,
    @Arg("status", () => OrderStatus) status: OrderStatus
  ): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new Error("Order not found");
    }
    order.status = status;
    order.updatedAt = new Date();
    return await this.orderRepository.save(order);
  }
}
