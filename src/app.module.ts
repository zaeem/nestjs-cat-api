import { EnvConfigModule } from "@infrastructure/config/env-config/env-config.module";
import { ControllersModule } from "@infrastructure/presentation/controllers.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [EnvConfigModule, ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
