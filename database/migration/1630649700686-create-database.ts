import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1630649700686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createDatabase('itapp-db');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropDatabase('itapp-db');
    }

}
