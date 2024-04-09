import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseOrmConfigModule } from "@infrastructure/config/database-orm-config/database-orm-config.module";
import { User } from "../entities/user.entity";
import { UserRepository } from "./user/user.repository";
import { Cat } from "../entities/cat.entity";
import { CatRepository } from "./cat/cat.repository";
import { UserCats } from "../entities/user-cat.entity";
import { UserCatsRepository } from "./usercats/user-cats.repository";

@Module({
  imports: [
    DatabaseOrmConfigModule,
    TypeOrmModule.forFeature([User, Cat, UserCats]),
  ],
  exports: [UserRepository, CatRepository, UserCatsRepository],
  providers: [UserRepository, CatRepository, UserCatsRepository],
})
export class RepositoriesModule {}
