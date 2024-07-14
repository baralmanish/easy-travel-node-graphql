import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

import { Order } from "../entity/Order";
import { Bundle } from "../entity/Bundle";
import { Product } from "../entity/Product";
import { OrderStatus } from "../enums/order";
import { AppDataSource } from "../data-source";

@Resolver(() => Order)
export class OrderResolver {
  private orderRepository = AppDataSource.getRepository(Order);
  private bundleRepository = AppDataSource.getRepository(Bundle);
  private productRepository = AppDataSource.getRepository(Product);

  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ["product", "bundle"] });
  }

  @Query(() => Order, { nullable: true })
  async order(@Arg("id", () => Int) id: number): Promise<Order | undefined> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ["product", "bundle"],
    });

    return order || undefined;
  }

  @Mutation(() => Order)
  async createOrder(
    @Arg("customerName") customerName: string,
    @Arg("customerEmail") customerEmail: string,
    @Arg("productId", () => Int, { nullable: true }) productId?: number,
    @Arg("bundleId", () => Int, { nullable: true }) bundleId?: number
  ): Promise<Order> {
    let product: Product | undefined;
    let bundle: Bundle | undefined;

    if (productId) {
      product = (await this.productRepository.findOneBy({ id: productId })) || undefined;
      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }
    }

    if (bundleId) {
      bundle = (await this.bundleRepository.findOneBy({ id: bundleId })) || undefined;
      if (!bundle) {
        throw new Error(`Bundle with ID ${bundleId} not found.`);
      }
    }

    if (!product && !bundle) {
      throw new Error("Either productId or bundleId must be provided.");
    }

    const order = new Order();
    order.customerName = customerName;
    order.customerEmail = customerEmail;
    if (product) {
      order.product = product;
    }
    if (bundle) {
      order.bundle = bundle;
    }
    return await this.orderRepository.save(order);
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
