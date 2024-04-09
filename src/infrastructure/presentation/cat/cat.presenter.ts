import { ICat } from "@domain/model/cat.interface";
import { UserPresenter } from "../user/user.presenter";

export class CatPresenter implements Partial<ICat> {
  id: number;
  name: string;
  user: UserPresenter;

  constructor(partial: Partial<ICat>) {
    Object.assign(this, partial);
  }
}
