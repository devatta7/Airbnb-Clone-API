import { Roles } from '../../common/constants/roles.constant';

export interface JwtPayload {
  id: string;
  role: Roles;
}
