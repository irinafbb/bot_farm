import {MigrationInterface, QueryRunner} from "typeorm";

export class INIT1660996910078 implements MigrationInterface {
    name = 'INIT1660996910078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
        await queryRunner.query(`CREATE TABLE "union_names" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "other_name" character varying, CONSTRAINT "PK_330ea219032d11d50219931594f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "union_names"`);
    }

}
