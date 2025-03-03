import { MigrationInterface, QueryRunner } from "typeorm";

export class FitcoData1740976287773 implements MigrationInterface {
    name = 'FitcoData1740976287773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`meal_plans\` (\`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`meal_plan_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`client_uuid\` varchar(255) NOT NULL, \`meal_uuid\` varchar(255) NOT NULL, \`meal_type\` enum ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK') NOT NULL, \`date\` date NOT NULL, INDEX \`IDX_b2116b49b3f21895961e226f47\` (\`meal_plan_id\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`meals\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`meals\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`emergency_contact\` \`emergency_contact\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`emergency_phone\` \`emergency_phone\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`meal_plans\` ADD CONSTRAINT \`FK_42948ca28e3d6c59c03e59b6411\` FOREIGN KEY (\`client_uuid\`) REFERENCES \`clients\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`meal_plans\` ADD CONSTRAINT \`FK_3848cf667cb7830d4ace2329825\` FOREIGN KEY (\`meal_uuid\`) REFERENCES \`meals\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`meal_plans\` DROP FOREIGN KEY \`FK_3848cf667cb7830d4ace2329825\``);
        await queryRunner.query(`ALTER TABLE \`meal_plans\` DROP FOREIGN KEY \`FK_42948ca28e3d6c59c03e59b6411\``);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`emergency_phone\` \`emergency_phone\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`emergency_contact\` \`emergency_contact\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`meals\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`meals\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_b2116b49b3f21895961e226f47\` ON \`meal_plans\``);
        await queryRunner.query(`DROP TABLE \`meal_plans\``);
    }

}
