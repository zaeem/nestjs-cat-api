import { IUser } from "@domain/model/user.interface";
import { UserRepository } from "@infrastructure/orm/repositories/user/user.repository";
import {
  LoginDto,
  SignUpDto,
} from "@infrastructure/presentation/user/user.dto";
import { PasswordGeneratorService } from "@infrastructure/services/bcrypt/bcrypt.service";
import { JwtService } from "@infrastructure/services/jwt/jwt.service";

export class UserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordGeneratorService: PasswordGeneratorService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, ...dto } = signUpDto;
    const encryptedPassword =
      await this.passwordGeneratorService.encryptPassword(password);
    await this.userRepository.create({ ...dto, password: encryptedPassword });
    return "user created succesfully.";
  }

  async login(loginDto: LoginDto) {
    const token = this.jwt.createAccessToken({ email: loginDto.email }, "1h");
    const user = await this.userRepository.findBy({ email: loginDto.email });
    return { email: loginDto.email, token, id: user.id };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<IUser> | null> {
    const user = await this.userRepository.findBy({ email });
    if (user?.password) {
      const passwordMatched =
        await this.passwordGeneratorService.comparePassword(
          password.toString(),
          user?.password,
        );

      if (user && passwordMatched) {
        const { password: _, ...userWithoutPwd } = user;
        return userWithoutPwd;
      }

      return null;
    }
    return null;
  }

  async validateToken(email: string) {
    const user = await this.userRepository.findBy({ email });

    if (user) {
      const { password: _, ...userWithoutPwd } = user;
      return userWithoutPwd;
    }

    return null;
  }
}
