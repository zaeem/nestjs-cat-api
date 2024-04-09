import { type IUser } from "@domain/model/user.interface";
import { UpdateResult } from "typeorm";

export interface IUserRepository {
  findBy: (user: Partial<IUser>) => Promise<Partial<IUser> | null>;
  create: (user: Partial<IUser>) => Promise<Partial<IUser> | null>;
  update: (id: number, user: Partial<IUser>) => Promise<UpdateResult>;
  updateByEmail: (email: string, user: Partial<IUser>) => Promise<UpdateResult>;
}
