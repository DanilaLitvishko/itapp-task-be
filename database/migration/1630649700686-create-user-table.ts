import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1630667288021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isConfirm',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'accessTokenCreatedAt',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
