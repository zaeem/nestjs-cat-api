import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserUsecase } from "@use-cases/user/user.usecase";
import UsecaseProxy, {
  USER_USECASE_PROXY,
} from "infrastructure-usecases-bridge/usecase-proxy";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_USECASE_PROXY)
    private readonly userUsecaseProxy: UsecaseProxy<UserUsecase>,
    private readonly configService: ConfigService,
  ) {
    const secretOrKey = configService.get("jwtConfig").accessTokenSecret;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.userUsecaseProxy
      .getInstance()
      .validateToken(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
