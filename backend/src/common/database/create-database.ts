import 'dotenv/config';
import { DataSource } from 'typeorm';

import User from 'src/users/entities/user.entity';
import Client from 'src/clients/entities/client.entity';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

export const dataSource = new DataSource({
  type: 'mysql',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: ['error'],
  entities: [User, Client],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});

export const getDataSourceRepository = async (entity: any) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource.manager.getRepository(entity);
};
