import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudents1786284060582 implements MigrationInterface {
    name = 'CreateStudents1786284060582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "major" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
