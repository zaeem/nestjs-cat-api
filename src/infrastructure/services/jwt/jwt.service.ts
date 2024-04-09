import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService as NestJwtService } from "@nestjs/jwt";

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  createAccessToken(
    payload: { email: string },
    expiresIn: string = "",
  ): string {
    const secret = this.getAccessTokenSecret();

    return this.createToken(payload, { secret, expiresIn });
  }

  private getAccessTokenSecret(): string {
    return this.configService.get("jwtConfig").accessTokenSecret;
  }

  private createToken(payload: any, options = {}): string {
    return this.jwtService.sign(payload, options);
  }
}
