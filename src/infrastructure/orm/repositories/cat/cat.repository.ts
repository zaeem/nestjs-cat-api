import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICatRepository } from "@domain/repositories/cat.interface";
import { Cat } from "@infrastructure/orm/entities/cat.entity";

export class CatRepository implements ICatRepository {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(cat: Partial<Cat>) {
    const init = this.catRepository.create(cat);
    return this.catRepository.save(init);
  }

  async findById(id: number) {
    return this.catRepository.findOne({ where: { id } });
  }

  async findByUserId(id: number) {
    // return this.catRepository.find({where:{user:{id}},select:{
    //   id:true,
    //   name: true,
    //   user:{
    //     id: true,
    //     name: true,
    //     email: true,
    //   }
    // } , relations:{user: true}})
  }

  async update(id: number, cat: Partial<Cat>) {
    return this.catRepository.update(id, cat);
  }

  async delete(id: number) {
    return this.catRepository.delete(id);
  }

  async find() {
    return this.catRepository.find();
  }
}
