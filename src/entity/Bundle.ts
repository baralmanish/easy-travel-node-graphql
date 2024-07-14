import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Bundle {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column("decimal")
  price!: number;

  @Field(() => [Product])
  @ManyToMany(() => Product)
  @JoinTable({
    name: "bundle_products_product",
    joinColumn: {
      name: "bundleId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
  })
  products!: Product[];
}
