import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  entities: [`${__dirname}/../entities/*.orm-entity{.ts,.js}`],
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  logging: true,
};

const developmentConfig: DataSourceOptions = {
  ...baseConfig,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const testingConfig: DataSourceOptions = {
  ...baseConfig,
  host: process.env.DB_TEST_HOST,
  port: Number(process.env.DB_TEST_PORT),
  username: process.env.DB_TEST_USERNAME,
  password: process.env.DB_TEST_PASSWORD,
  database: process.env.DB_TEST_NAME,
};

const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const dataSourceConfig: DataSourceOptions = isDevelopmentEnv
  ? developmentConfig
  : testingConfig;

export const dataSource = new DataSource(dataSourceConfig);
