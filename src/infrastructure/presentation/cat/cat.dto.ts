import { IsNotEmpty, IsString } from "class-validator";

export class CatDto {
  @IsNotEmpty()
  readonly name: string;
}
