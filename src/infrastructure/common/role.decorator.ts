import { UserRole } from "@infrastructure/orm/entities/user.entity";
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
