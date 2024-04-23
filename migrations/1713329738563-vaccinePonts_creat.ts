import { MigrationInterface, QueryRunner } from 'typeorm';

export class VaccinePontsCreat1713329738563 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "vaccine_points" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "address" character varying NOT NULL,
            "manager" character varying NOT NULL,
            "table_number" integer NOT NULL,
            "districtId" integer NULL,
            CONSTRAINT "PK_6f5c74476ed03019ddebbdf2e78" PRIMARY KEY ("id"),
            ON UPDATE NO ACTION
        )`);
    await queryRunner.query(
      `ALTER TABLE "vaccine_points" ADD CONSTRAINT "FK_40acf9ead59c617e0c8fd394432" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vaccine_points"`);
  }
}
