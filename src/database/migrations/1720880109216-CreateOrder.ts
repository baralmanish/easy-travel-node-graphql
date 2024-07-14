import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrder1720880109216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "order" (
              "id" SERIAL NOT NULL,
              "customerName" character varying NOT NULL,
              "customerEmail" character varying NOT NULL,
              "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
              "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
              "productId" integer,
              CONSTRAINT "PK_d07825a2e8a8b7c3ed2ffcb4e68" PRIMARY KEY ("id"),
              CONSTRAINT "FK_38f89c7b4f37012e362b320bb25" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "order"
      `);
  }
}
