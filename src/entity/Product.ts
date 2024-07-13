import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Int, Float, InputType } from "type-graphql";
import { Category } from "./Category";

@ObjectType()
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

  @Field(() => Int)
  @Column({ default: 1 })
  quantity!: number;

  @Field()
  @Column({ default: true })
  isActive!: boolean;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.products, { lazy: true, onDelete: "CASCADE" })
  category!: Promise<Category>;
}

@InputType()
export class UpdateProductInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => Int, { nullable: true })
  categoryId?: number;
}
