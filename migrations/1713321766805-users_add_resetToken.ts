import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersAddResetToken1713321766805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN resetToken varchar NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN resetToken
        `);
  }
}
