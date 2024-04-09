import { Cat } from "@infrastructure/orm/entities/cat.entity";
import { User } from "@infrastructure/orm/entities/user.entity";
import { UserCats } from "@infrastructure/orm/entities/user-cat.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";

@Injectable()
export class UserCatsRepository {
  constructor(
    @InjectRepository(UserCats)
    private userCatsRepository: Repository<UserCats>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async markCatAsFavorite(userId: number, catId: number): Promise<UserCats> {
    const existingUserCat = await this.userCatsRepository.findOne({
      where: { user: { id: userId }, cat: { id: catId } },
    });
    if (!existingUserCat) {
      const user = await this.userRepository.findOneBy({ id: userId });
      const cat = await this.catRepository.findOneBy({ id: catId });
      if (!user && !cat) {
        throw new NotFoundException();
      }
      const userCat = this.userCatsRepository.create({ user, cat });
      return this.userCatsRepository.save(userCat);
    } else {
      return existingUserCat;
    }
  }

  async listFavoriteCats(userId: number) {
    return this.userCatsRepository.find({
      where: { user: { id: userId } },
      relations: {
        cat: true,
      },
    });
  }
}
