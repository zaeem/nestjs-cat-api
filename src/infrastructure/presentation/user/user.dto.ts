import { IUser } from "@domain/model/user.interface";
import { IsEmail, IsString, IsNotEmpty, Length } from "class-validator";

export class SignUpDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 20)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 20)
  @IsString()
  readonly password: string;
}
