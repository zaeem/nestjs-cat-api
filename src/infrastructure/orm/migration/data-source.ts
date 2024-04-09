import { DataSource, type DataSourceOptions } from "typeorm";
require("dotenv").config({ path: ".env" });

export const dataSourceOptions: DataSourceOptions = {
  host: process.env.DATABASE_MIGRATION_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  type: "postgres",
  logging: true,
  entities: ["dist/infrastructure/orm/entities/*.entity.js"],
  migrations: ["dist/infrastructure/orm/migration/migrations/*.js"],
  migrationsRun: true,
  migrationsTableName: "custom_migration_table",
};

const datasource = new DataSource(dataSourceOptions);
export default datasource;
