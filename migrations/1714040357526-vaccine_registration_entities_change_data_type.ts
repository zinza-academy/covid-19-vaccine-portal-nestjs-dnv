import { MigrationInterface, QueryRunner } from "typeorm";

export class VaccineRegistrationEntitiesChangeDataType1714040357526 implements MigrationInterface {
    name = 'VaccineRegistrationEntitiesChangeDataType1714040357526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP COLUMN "priorityType"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD "priorityType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP COLUMN "job"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD "job" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP COLUMN "desired_date"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD "desired_date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP COLUMN "desired_date"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD "desired_date" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP COLUMN "job"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD "job" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP COLUMN "priorityType"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD "priorityType" integer NOT NULL`);
    }

}
