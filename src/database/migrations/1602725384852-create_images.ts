import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ORPHANAGES_TABLE_NAME } from './1602723138187-create_orphanages';

export const IMAGES_TABLE_NAME = 'images';

export class createImages1602725384852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: IMAGES_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'orphanage_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'ImageOrphanage',
            columnNames: ['orphanage_id'],
            referencedTableName: ORPHANAGES_TABLE_NAME,
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(IMAGES_TABLE_NAME);
  }
}
