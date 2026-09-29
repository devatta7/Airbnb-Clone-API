import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IPrincipal } from '../interfaces/principal.interface';

import { Roles } from '../roles/roles.constant';

import { UsersService } from '../../users/users.service';
import { SystemAdminsService } from '../../system-admins/system-admins.service';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

export type RequestWithUser = Request & {
  principal: IPrincipal;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminsService: SystemAdminsService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      const currentAccount = await this.buildCurrentUser(payload);

      request.principal = currentAccount;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private async buildCurrentUser(payload: JwtPayload): Promise<IPrincipal> {
    let currentAccount: {
      _id: unknown;
      name: string;
      email: string;
    } | null;

    if (payload.role === Roles.USER) {
      currentAccount = await this.usersService.findOne({
        _id: payload.id,
      });
    } else {
      currentAccount = await this.adminsService.findOne({
        _id: payload.id,
      });
    }

    if (!currentAccount) {
      throw new UnauthorizedException('Account not found');
    }

    return {
      user: {
        _id: String(currentAccount._id),
        name: currentAccount.name,
        email: currentAccount.email,
      },
      role: payload.role,
    };
  }
}
