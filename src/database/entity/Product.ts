import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Int, Float, InputType } from "type-graphql";

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

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column("float")
  price!: number;

  @Field(() => Int)
  @Column({ default: 1 })
  quantity!: number;

  @Field(() => Boolean)
  @Column({ default: true })
  isActive!: boolean;
}

@InputType()
export class CreateProductInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  category!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  quantity?: number;
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

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
