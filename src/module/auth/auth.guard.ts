import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthType, DecodeJwtDto } from 'src/common/enum';
import { AUTH_KEY } from './auth.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredAuth = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAuth) return true;

    const token = context.switchToHttp().getRequest().headers
      .authorization as string;
    const user: DecodeJwtDto = this.authService.decode(token);

    if (requiredAuth?.includes(user?.role as AuthType)) return true;
  }
}
