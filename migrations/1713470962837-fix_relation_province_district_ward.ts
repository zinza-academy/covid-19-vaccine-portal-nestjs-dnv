import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationProvinceDistrictWard1713470962837 implements MigrationInterface {
    name = 'FixRelationProvinceDistrictWard1713470962837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_points" DROP CONSTRAINT "FK_40acf9ead59c617e0c8fd394432"`);
        await queryRunner.query(`ALTER TABLE "vaccine_points" RENAME COLUMN "districtId" TO "wardId"`);
        await queryRunner.query(`ALTER TABLE "vaccine_points" ADD CONSTRAINT "FK_d93cc5d0000005022b1bfa193d5" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_points" DROP CONSTRAINT "FK_d93cc5d0000005022b1bfa193d5"`);
        await queryRunner.query(`ALTER TABLE "vaccine_points" RENAME COLUMN "wardId" TO "districtId"`);
        await queryRunner.query(`ALTER TABLE "vaccine_points" ADD CONSTRAINT "FK_40acf9ead59c617e0c8fd394432" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
