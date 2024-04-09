import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Cat } from "./cat.entity";

@Entity({ name: "UserCats" })
export class UserCats {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCats)
  user: User;

  @ManyToOne(() => Cat, (cat) => cat.userCats)
  cat: Cat;
}
