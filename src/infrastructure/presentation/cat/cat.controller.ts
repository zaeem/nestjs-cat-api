import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import UsecaseProxy, {
  CAT_USECASE_PROXY,
} from "infrastructure-usecases-bridge/usecase-proxy";
import { CatUsecase } from "@use-cases/cat/cat.usecase";
import { CatDto } from "./cat.dto";
import { JwtAuthGuard } from "@infrastructure/guards/jwt-auth.guard";
import { Roles } from "@infrastructure/common/role.decorator";
import { UserRole } from "@infrastructure/orm/entities/user.entity";
import { RolesGuard } from "@infrastructure/guards/role.guard";
import { CatPresenter } from "./cat.presenter";
import { UserPresenter } from "../user/user.presenter";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("/cats")
export class CatController {
  constructor(
    @Inject(CAT_USECASE_PROXY)
    private readonly catUsecaseProxy: UsecaseProxy<CatUsecase>,
  ) {}

  @Roles(UserRole.ADMIN)
  @Delete("/:id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.catUsecaseProxy.getInstance().delete(id);
  }
  @HttpCode(200)
  @Post("/favorites/:userId")
  async markFavoriteCatByUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() catId: number,
  ) {
    return this.catUsecaseProxy
      .getInstance()
      .markFavoriteCatByUser(userId, catId);
  }

  @Roles(UserRole.ADMIN)
  @Post("")
  async createCat(@Body() cat: CatDto) {
    return this.catUsecaseProxy.getInstance().create(cat);
  }

  @Get("")
  async list() {
    return this.catUsecaseProxy.getInstance().list();
  }

  @Get("/:id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return this.catUsecaseProxy.getInstance().findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put("/:id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() cat: CatDto) {
    return this.catUsecaseProxy.getInstance().update(id, cat);
  }

  @Get("/:userId/favorites/list/")
  async listFavoritesItem(@Param("userId", ParseIntPipe) userId: number) {
    const cats = await this.catUsecaseProxy
      .getInstance()
      .getFavoritesItem(userId);
    return cats.map((value) => new CatPresenter(value));
  }
}
