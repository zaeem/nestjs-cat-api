import { Module } from "@nestjs/common";
import { TypeOrmModule, type TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const getTypeOrmModuleOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  console.log("ConfigService");
  console.log(configService.get("database"));

  const envDatabaseConfiguration = configService.get("database");

  return {
    ...envDatabaseConfiguration,
    logging: true,
    synchronize: false,
    entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
  };
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class DatabaseOrmConfigModule {}
