import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated();
  }
}