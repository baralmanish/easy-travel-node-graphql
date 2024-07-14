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
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("order");
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("productId") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("order", foreignKey);
    }
    await queryRunner.dropTable("order");
  }
}
