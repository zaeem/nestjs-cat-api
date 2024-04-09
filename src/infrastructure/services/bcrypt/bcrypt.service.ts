import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";

@Injectable()
export class PasswordGeneratorService {
  private readonly saltRounds = 10;

  generateRandomPassword(length: number = 8): string {
    return randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  }

  async encryptPassword(password?: string): Promise<string> {
    const pass = password || this.generateRandomPassword();
    return bcrypt.hash(pass, this.saltRounds);
  }

  async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}
