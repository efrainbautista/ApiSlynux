import { SqlReader } from "node-sql-reader";
import { MigrationInterface, QueryRunner } from "typeorm"

export class MasterData1669237908885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    const folder = __dirname;
    const path = folder + '/master-data.sql';
    let queries = SqlReader.readSqlFile(path);
    for (let query of queries) {
        await queryRunner.query(query);
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
