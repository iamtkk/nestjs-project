import { DataSource } from 'typeorm';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'test',
  database: 'test',
  entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [path.join(__dirname, '**', 'migrations', '*.js')],
  migrationsTableName: 'migrations',
});
