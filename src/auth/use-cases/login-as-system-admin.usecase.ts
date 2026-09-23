import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';

import { FindSystemAdminUseCase } from '../../system-admins/usecases/find-system-admin.usecase';
import { Roles } from '../../common/constants/roles.constant';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { GenerateTokenUseCase } from './generateTokens.usecase';

@Injectable()
export class LoginAsSystemAdminUseCase {
  constructor(
    private readonly findSystemAdminUseCase: FindSystemAdminUseCase,
    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    const systemAdmin = await this.findSystemAdminUseCase.execute({
      email: body.email,
      isDeleted: false,
    });

    if (!systemAdmin) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      systemAdmin.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    const { accessToken, refreshToken } =
      await this.generateTokenUseCase.execute({
        id: systemAdmin._id.toString(),
        role: Roles.SYSTEM_ADMIN,
      });

    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
