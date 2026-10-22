import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithPrincipal } from '../guards/jwt-auth.guard';

export const CurrentAccount = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithPrincipal>();

    if (!request) return null;

    const { user, role } = request.principal;

    return {
      user,
      role,
    };
  },
);
