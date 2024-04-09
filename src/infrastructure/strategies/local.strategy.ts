import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, BadRequestException, Inject } from "@nestjs/common";
import UsecaseProxy, {
  USER_USECASE_PROXY,
} from "infrastructure-usecases-bridge/usecase-proxy";
import { UserUsecase } from "@use-cases/user/user.usecase";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_USECASE_PROXY)
    private readonly UserUsecaseProxy: UsecaseProxy<UserUsecase>,
  ) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.UserUsecaseProxy.getInstance().validateUser(
      email,
      password,
    );

    if (!user) {
      throw new BadRequestException("Invalid email or password", {
        cause: new Error(),
        description: "Bad Request",
      });
    }

    return user;
  }
}
