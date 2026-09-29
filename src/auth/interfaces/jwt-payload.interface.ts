import { Roles } from '../roles/roles.constant';

export interface JwtPayload {
  id: string;
  role: Roles;
}
