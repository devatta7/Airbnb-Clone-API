import { SetMetadata, type CustomDecorator } from '@nestjs/common';
import type { Roles as Role } from '../roles/roles.constant';

export const ROLES_KEY = 'roles';
export const RolesAllowed = (...roles: Role[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
