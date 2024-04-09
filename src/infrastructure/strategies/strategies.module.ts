import { Module } from "@nestjs/common";
import { LocalStrategy } from "./local.strategy";
import { InfrastructureUsecasesBridgeModule } from "infrastructure-usecases-bridge/infrastructure-usecases-bridge.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [InfrastructureUsecasesBridgeModule.register()],
  providers: [LocalStrategy, JwtStrategy],
})
export class StrategyModule {}
