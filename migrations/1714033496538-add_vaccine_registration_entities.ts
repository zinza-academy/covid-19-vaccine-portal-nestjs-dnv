import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVaccineRegistrationEntities1714033496538 implements MigrationInterface {
    name = 'AddVaccineRegistrationEntities1714033496538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vaccine_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "batchNumber" character varying NOT NULL, CONSTRAINT "PK_cfcd3c9e2653d296fa54c36052e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccine_registration_results" ("id" SERIAL NOT NULL, "vaccination_time" date NOT NULL, "vaccine_type_id" integer, "vaccineRegistrationId" integer NOT NULL, CONSTRAINT "REL_5cad8bb0c3b03459f26d8ccceb" UNIQUE ("vaccineRegistrationId"), CONSTRAINT "PK_0ee92b333f622462e11c1cf9fb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vaccine_registrations_status_enum" AS ENUM('requested', 'accepted', 'rejected', 'completed')`);
        await queryRunner.query(`CREATE TABLE "vaccine_registrations" ("id" SERIAL NOT NULL, "priorityType" integer NOT NULL, "job" integer NOT NULL, "workplace" character varying NOT NULL, "address" character varying NOT NULL, "desired_date" integer NOT NULL, "health_insurance_number" character varying NOT NULL, "appointmentDate" date NOT NULL, "status" "public"."vaccine_registrations_status_enum" NOT NULL DEFAULT 'requested', "user_id" integer, CONSTRAINT "PK_5eef09dc26d028661d05b375546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vaccine_registration_results" ADD CONSTRAINT "FK_0932af08f83e2d98f05778b1b49" FOREIGN KEY ("vaccine_type_id") REFERENCES "vaccine_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccine_registration_results" ADD CONSTRAINT "FK_5cad8bb0c3b03459f26d8ccceb5" FOREIGN KEY ("vaccineRegistrationId") REFERENCES "vaccine_registrations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" ADD CONSTRAINT "FK_36b826d318aebdb4a3858bb1e0a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_registrations" DROP CONSTRAINT "FK_36b826d318aebdb4a3858bb1e0a"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registration_results" DROP CONSTRAINT "FK_5cad8bb0c3b03459f26d8ccceb5"`);
        await queryRunner.query(`ALTER TABLE "vaccine_registration_results" DROP CONSTRAINT "FK_0932af08f83e2d98f05778b1b49"`);
        await queryRunner.query(`DROP TABLE "vaccine_registrations"`);
        await queryRunner.query(`DROP TYPE "public"."vaccine_registrations_status_enum"`);
        await queryRunner.query(`DROP TABLE "vaccine_registration_results"`);
        await queryRunner.query(`DROP TABLE "vaccine_type"`);
    }

}
