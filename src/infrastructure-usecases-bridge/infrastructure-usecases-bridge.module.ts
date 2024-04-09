import { RepositoriesModule } from "@infrastructure/orm/repositories/repository.module";
import { UserRepository } from "@infrastructure/orm/repositories/user/user.repository";
import { DynamicModule, Module } from "@nestjs/common";
import UsecaseProxy, {
  CAT_USECASE_PROXY,
  USER_USECASE_PROXY,
} from "./usecase-proxy";
import { UserUsecase } from "@use-cases/user/user.usecase";
import { BcryptServiceModule } from "@infrastructure/services/bcrypt/bcrypt.module";
import { PasswordGeneratorService } from "@infrastructure/services/bcrypt/bcrypt.service";
import { JwtServiceModule } from "@infrastructure/services/jwt/jwt-service.module";
import { JwtService } from "@infrastructure/services/jwt/jwt.service";
import { CatRepository } from "@infrastructure/orm/repositories/cat/cat.repository";
import { CatUsecase } from "@use-cases/cat/cat.usecase";
import { UserCatsRepository } from "@infrastructure/orm/repositories/usercats/user-cats.repository";
@Module({
  imports: [RepositoriesModule, BcryptServiceModule, JwtServiceModule],
})
export class InfrastructureUsecasesBridgeModule {
  static register(): DynamicModule {
    return {
      module: InfrastructureUsecasesBridgeModule,
      providers: [
        {
          inject: [UserRepository, PasswordGeneratorService, JwtService],
          provide: USER_USECASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            passwordGeneratorService: PasswordGeneratorService,
            jwt: JwtService,
          ) =>
            new UsecaseProxy(
              new UserUsecase(userRepository, passwordGeneratorService, jwt),
            ),
        },
        {
          inject: [CatRepository, UserCatsRepository],
          provide: CAT_USECASE_PROXY,
          useFactory: (
            catRepository: CatRepository,
            usercats: UserCatsRepository,
          ) => new UsecaseProxy(new CatUsecase(catRepository, usercats)),
        },
      ],
      exports: [USER_USECASE_PROXY, CAT_USECASE_PROXY],
    };
  }
}
