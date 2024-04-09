import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { LoginDto, SignUpDto } from "./user.dto";
import UsecaseProxy, {
  USER_USECASE_PROXY,
} from "infrastructure-usecases-bridge/usecase-proxy";
import { UserUsecase } from "@use-cases/user/user.usecase";
import { LocalAuthGuard } from "@infrastructure/guards/auth.guard";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("/auth")
export class UserController {
  constructor(
    @Inject(USER_USECASE_PROXY)
    private readonly userUsecaseProxy: UsecaseProxy<UserUsecase>,
  ) {}

  @Post("/register")
  async userSignUp(@Body() SignUpDto: SignUpDto) {
    return this.userUsecaseProxy.getInstance().signUp(SignUpDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async userLogin(@Body() loginDto: LoginDto) {
    return this.userUsecaseProxy.getInstance().login(loginDto);
  }
}
