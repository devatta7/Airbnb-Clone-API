import { Injectable } from '@nestjs/common';

import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { Roles } from '../../common/constants/roles.constant';
import { LoginAsSystemAdminUseCase } from './login-as-system-admin.usecase';
import { LoginAsUserUseCase } from './login-as-user.usecase';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly loginAsUserUseCase: LoginAsUserUseCase,
    private readonly loginAsSystemAdminUseCase: LoginAsSystemAdminUseCase,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    if (body.role === Roles.SYSTEM_ADMIN) {
      return this.loginAsSystemAdminUseCase.execute(body);
    }

    return this.loginAsUserUseCase.execute(body);
  }
}
