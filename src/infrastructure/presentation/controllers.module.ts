import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { InfrastructureUsecasesBridgeModule } from "infrastructure-usecases-bridge/infrastructure-usecases-bridge.module";
import { UserController } from "./user/user.controller";
import { StrategyModule } from "@infrastructure/strategies/strategies.module";
import { CatController } from "./cat/cat.controller";

@Module({
  imports: [InfrastructureUsecasesBridgeModule.register(), StrategyModule],
  controllers: [UserController, HealthController, CatController],
  providers: [],
})
export class ControllersModule {}
