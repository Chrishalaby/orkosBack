import { MigrationInterface, QueryRunner } from 'typeorm';

export class newauth1673452324059 implements MigrationInterface {
  name = 'newauth1673452324059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "inventoryStatus" character varying NOT NULL, "infoTheme" character varying NOT NULL, "infoDate" character varying NOT NULL, "food" boolean NOT NULL, "drinks" boolean NOT NULL, "parking" boolean NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "isEventOrganizer" boolean NOT NULL, "salt" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
