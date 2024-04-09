import { IUser } from "@domain/model/user.interface";
import { Exclude } from "class-transformer";

export class UserPresenter implements Partial<IUser> {
  id: number;
  name: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  role: string;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
