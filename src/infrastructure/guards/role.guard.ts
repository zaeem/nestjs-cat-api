import { IUser } from "@domain/model/user.interface";
import { User, UserRole } from "@infrastructure/orm/entities/user.entity";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      "roles",
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Partial<User> = request.user;

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
