import { Injectable } from '@nestjs/common';

import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokenUseCase } from './generateTokens.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UsersService,
    private readonly generateToken: GenerateTokenUseCase,
  ) {}

  async execute(body: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(body);

    const { accessToken, refreshToken } = await this.generateToken.execute(
      user._id.toString(),
    );

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
