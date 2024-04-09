import { IUser } from "@domain/model/user.interface";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Cat } from "./cat.entity";
import { UserCats } from "./user-cat.entity";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity({ name: "User" })
@Index("index_user_email", ["email"], { unique: true })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("text", { nullable: true })
  password: string;

  @OneToMany(() => UserCats, (userCats) => userCats.user, { cascade: true })
  userCats: UserCats[];

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
