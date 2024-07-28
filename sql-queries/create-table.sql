-- create Type
CREATE TYPE "public"."carts_status_enum" AS enum('OPEN', 'STATUS') 

-- create Table
CREATE TABLE "carts"
  (
     "id"         CHARACTER VARYING NOT NULL,
     "user_id"    UUID NOT NULL,
     "created_at" DATE NOT NULL,
     "updated_at" DATE NOT NULL,
     "status"     "public"."CARTS_STATUS_ENUM" NOT NULL,
     CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id")
  ) 

-- create Table
CREATE TABLE "cart_items"
  (
     "product_id" CHARACTER VARYING NOT NULL,
     "count"      INTEGER NOT NULL,
     "cart_id"    CHARACTER VARYING,
     CONSTRAINT "PK_30e89257a105eab7648a35c7fce" PRIMARY KEY ("product_id")
  ) 

-- create Table
CREATE TABLE "orders"
  (
     "id"       CHARACTER VARYING NOT NULL,
     "payment"  JSON NOT NULL,
     "delivery" JSON NOT NULL,
     "comments" CHARACTER VARYING NOT NULL,
     "status"   CHARACTER VARYING NOT NULL,
     "total"    INTEGER NOT NULL,
     "cart_id"  CHARACTER VARYING,
     CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
  ) 

-- alert Table
ALTER TABLE "cart_items"
  ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id")
  REFERENCES "carts"("id") ON DELETE no action ON UPDATE no action 

-- alert Table
ALTER TABLE "orders"
  ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id")
  REFERENCES "carts"("id") ON DELETE no action ON UPDATE no action 