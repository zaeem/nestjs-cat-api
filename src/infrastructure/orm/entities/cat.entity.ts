import { ICat } from "@domain/model/cat.interface";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { UserCats } from "./user-cat.entity";

@Entity({ name: "Cat" })
export class Cat extends BaseEntity implements ICat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @OneToMany(() => UserCats, (userCats) => userCats.cat, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userCats: UserCats[];
}
