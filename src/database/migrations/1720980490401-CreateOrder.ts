import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { OrderStatus } from "../../enums/order";

export class CreateOrder1720980490401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "customerName",
            type: "varchar",
          },
          {
            name: "customerEmail",
            type: "varchar",
          },
          {
            name: "productId",
            type: "int",
            isNullable: true,
          },
          {
            name: "productId",
            type: "int",
            isNullable: true,
          },
          {
            name: "bundleId",
            type: "int",
            isNullable: true,
          },
          {
            name: "status",
            type: "enum",
            enum: [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
            default: `'${OrderStatus.PENDING}'`,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        columnNames: ["bundleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "bundle",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("order");

    const productForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("productId") !== -1);
    if (productForeignKey) {
      await queryRunner.dropForeignKey("order", productForeignKey);
    }

    const bundleForeignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("bundleId") !== -1);
    if (bundleForeignKey) {
      await queryRunner.dropForeignKey("order", bundleForeignKey);
    }

    await queryRunner.dropTable("order");
  }
}
