import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostTable1697741864813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                { 
                    name: 'title',
                    type: 'varchar', 
                    length: '50'
                },
                { 
                    name: 'description', 
                    type: 'varchar', 
                    length:'300'
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
          });
      
          await queryRunner.createTable(table);table
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}
