import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewTable1722185309263 implements MigrationInterface {
  name = 'NewTable1722185309263';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart_items" ("product_id" character varying NOT NULL, "count" integer NOT NULL, "cart_id" character varying, CONSTRAINT "PK_30e89257a105eab7648a35c7fce" PRIMARY KEY ("product_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" character varying NOT NULL, "payment" json NOT NULL, "delivery" json NOT NULL, "comments" character varying NOT NULL, "status" character varying NOT NULL, "total" integer NOT NULL, "cart_id" character varying, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carts_status_enum" AS ENUM('OPEN', 'STATUS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, "status" "public"."carts_status_enum" NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`,
    );
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TYPE "public"."carts_status_enum"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "cart_items"`);
  }
}
