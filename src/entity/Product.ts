import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Int, Float, InputType } from "type-graphql";

import { Category } from "./Category";

@ObjectType({ description: "Product" })
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column("text")
  description!: string;

  @Field(() => Float)
  @Column("decimal")
  price!: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: "timestamp", nullable: true })
  date!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location!: string;

  @Field()
  @Column({ default: true })
  isActive!: boolean;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.products, { eager: true, onDelete: "CASCADE" })
  category!: Category;
}

@InputType()
export class CreateProductInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Int)
  categoryId!: number;
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;
}
