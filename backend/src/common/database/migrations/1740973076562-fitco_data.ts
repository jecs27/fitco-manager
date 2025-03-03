import { MigrationInterface, QueryRunner } from "typeorm";

export class FitcoData1740973076562 implements MigrationInterface {
    name = 'FitcoData1740973076562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clients\` (\`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`client_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(10) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`emergency_contact\` varchar(255) NULL, \`emergency_phone\` varchar(10) NULL, \`active\` tinyint NOT NULL DEFAULT '1', INDEX \`IDX_49e91f1e368e3f760789e7764a\` (\`client_id\`), UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``);
        await queryRunner.query(`DROP INDEX \`IDX_49e91f1e368e3f760789e7764a\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
    }

}
