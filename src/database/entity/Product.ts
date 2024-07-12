import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Product {
  @Field(() => Int)
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

  @Field()
  @Column()
  availabilityDate!: Date;

  @Field(() => String)
  @Column()
  location!: string;
}
