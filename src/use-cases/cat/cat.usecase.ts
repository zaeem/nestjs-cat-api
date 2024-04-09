import { CatRepository } from "@infrastructure/orm/repositories/cat/cat.repository";
import { UserCatsRepository } from "@infrastructure/orm/repositories/usercats/user-cats.repository";
import { CatDto } from "@infrastructure/presentation/cat/cat.dto";
import { NotFoundException } from "@nestjs/common";

export class CatUsecase {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly userCatsRepository: UserCatsRepository,
  ) {}

  async findById(id: number) {
    const cat = await this.catRepository.findById(id);
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }
  async list() {
    return this.catRepository.find();
  }

  async create(cat: CatDto) {
    return this.catRepository.create(cat);
  }

  async update(id: number, cat: CatDto) {
    const isCatExist = await this.catRepository.findById(id);
    if (!isCatExist) {
      throw new NotFoundException();
    }

    return this.catRepository.update(id, { ...cat });
  }

  async delete(id: number) {
    const isCatExist = await this.catRepository.findById(id);
    if (!isCatExist) {
      throw new NotFoundException();
    }
    return this.catRepository.delete(id);
  }
  async markFavoriteCatByUser(userId: number, catId: any) {
    const { catId: id } = catId;
    return this.userCatsRepository.markCatAsFavorite(userId, id);
  }
  async getFavoritesItem(id: number) {
    return this.userCatsRepository.listFavoriteCats(id);
  }
}
