import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const datasource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_POSSWORD,
  database: process.env.DATA_BASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  autoLoadEntities: true,
} as DataSourceOptions);

datasource.initialize();
export default datasource;
