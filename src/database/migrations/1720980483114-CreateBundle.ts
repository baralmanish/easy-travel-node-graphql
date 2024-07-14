import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBundle1720980483114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bundle",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "price",
            type: "decimal",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "bundle_products_product",
        columns: [
          {
            name: "bundleId",
            type: "int",
            isPrimary: true,
          },
          {
            name: "productId",
            type: "int",
            isPrimary: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "bundle_products_product",
      new TableForeignKey({
        columnNames: ["bundleId"],
        referencedColumnNames: ["id"],
        referencedTableName: "bundle",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "bundle_products_product",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("bundle_products_product");
    await queryRunner.dropTable("bundle");
  }
}
