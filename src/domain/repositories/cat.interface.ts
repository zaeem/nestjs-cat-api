import { ICat } from "@domain/model/cat.interface";
import { DeleteResult, UpdateResult } from "typeorm";

export interface ICatRepository {
  create: (cat: Partial<ICat>) => Promise<Partial<ICat>>;
  update: (id: number, cat: Partial<ICat>) => Promise<UpdateResult>;
  delete: (id: number) => Promise<DeleteResult>;
  findById: (id: number) => Promise<Partial<ICat>>;
  find: () => Promise<Partial<ICat[]>>;
}
