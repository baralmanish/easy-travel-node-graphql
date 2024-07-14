import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProduct1720980467237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
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
          {
            name: "date",
            type: "varchar",
          },
          {
            name: "location",
            type: "varchar",
          },
          {
            name: "isActive",
            type: "boolean",
          },
          {
            name: "categoryId",
            type: "int",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "category",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("product");
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("categoryId") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("product", foreignKey);
    }
    await queryRunner.dropTable("product");
  }
}
