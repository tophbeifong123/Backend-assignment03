import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStudentStatus1786284496045 implements MigrationInterface {
    name = 'AddStudentStatus1786284496045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "status" character varying NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "status"`);
    }

}
