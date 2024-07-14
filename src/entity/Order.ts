import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Product } from "./Product";
import { OrderStatus } from "../enums/order";

registerEnumType(OrderStatus, {
  name: "OrderStatus",
  description: "The status of an order",
});

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  customerName!: string;

  @Field()
  @Column()
  customerEmail!: string;

  @Field()
  @Column()
  orderDate!: string;

  @Field(() => Product, { nullable: true })
  @ManyToOne(() => Product)
  product!: Product;

  @Field(() => OrderStatus)
  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;
}
