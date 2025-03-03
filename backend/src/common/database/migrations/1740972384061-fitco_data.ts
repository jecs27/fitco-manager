import { MigrationInterface, QueryRunner } from 'typeorm';

export class FitcoData1740972384061 implements MigrationInterface {
  name = 'FitcoData1740972384061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`userId\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT '1', \`token\` varchar(255) NOT NULL DEFAULT '', INDEX \`IDX_8bf09ba754322ab9c22a215c91\` (\`userId\`), UNIQUE INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` (\`password\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_450a05c0c4de5b75ac8d34835b\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8bf09ba754322ab9c22a215c91\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
