export const USER_USECASE_PROXY: string = "UserUsecaseProxy";
export const CAT_USECASE_PROXY: string = "CatUsecaseProxy";

export default class UsecaseProxy<T> {
  constructor(private readonly usecase: T) {}

  getInstance(): T {
    return this.usecase;
  }
}
