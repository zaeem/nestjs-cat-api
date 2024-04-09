import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { type IUser } from "@domain/model/user.interface";
import { IUserRepository } from "@domain/repositories/user.interface";
import { User } from "@infrastructure/orm/entities/user.entity";

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findBy(user: Partial<IUser>): Promise<Partial<User> | null> {
    return await this.userRepository.findOne({
      where: { ...user },
    });
  }

  async create(user: Partial<IUser>): Promise<Partial<User> | null> {
    const initUser = this.userRepository.create({ ...user });
    await this.userRepository.save(initUser);
    return initUser;
  }

  async update(id: number, user: Partial<IUser>): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async updateByEmail(
    email: string,
    user: Partial<User>,
  ): Promise<UpdateResult> {
    return await this.userRepository.update({ email }, user);
  }
}
