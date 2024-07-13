import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryAndProduct1720863387748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "category" (
              "id" SERIAL NOT NULL,
              "name" character varying NOT NULL,
              CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
          `);

    await queryRunner.query(`
            CREATE TABLE "product" (
              "id" SERIAL NOT NULL,
              "name" character varying NOT NULL,
              "description" character varying NOT NULL,
              "price" numeric NOT NULL,
              "quantity" integer NOT NULL,
              "isActive" boolean NOT NULL DEFAULT true,
              "categoryId" integer,
              CONSTRAINT "PK_22cc43e9a74d7498546e9a63e32" PRIMARY KEY ("id")
            )
          `);

    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_a4c4f4e9fa4563e3f23c97c34e1"
            FOREIGN KEY ("categoryId") REFERENCES "category"("id")
            ON DELETE CASCADE
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product" DROP CONSTRAINT "FK_a4c4f4e9fa4563e3f23c97c34e1"
    `);

    await queryRunner.query(`
      DROP TABLE "product"
    `);

    await queryRunner.query(`
      DROP TABLE "category"
    `);
  }
}
