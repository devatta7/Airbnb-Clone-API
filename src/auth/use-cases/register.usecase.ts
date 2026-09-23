import { Injectable } from '@nestjs/common';

import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokenUseCase } from './generateTokens.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../../common/constants/roles.constant';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UsersService,
    private readonly generateToken: GenerateTokenUseCase,
  ) {}

  async execute(body: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(body);

    const { accessToken, refreshToken } = await this.generateToken.execute({
      id: user._id.toString(),
      role: Roles.USER,
    });

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
