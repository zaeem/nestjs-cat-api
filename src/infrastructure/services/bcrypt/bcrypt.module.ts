// mailer.module.ts
import { Module } from "@nestjs/common";
import { PasswordGeneratorService } from "./bcrypt.service";
@Module({
  providers: [PasswordGeneratorService],
  exports: [PasswordGeneratorService],
})
export class BcryptServiceModule {}
