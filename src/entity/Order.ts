import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Product } from "./Product";

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
}
