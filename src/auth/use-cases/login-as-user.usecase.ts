import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginDto } from '../dtos/login.dto';
import { GenerateTokensUseCase } from './generate-tokens.usecase';
import { UsersService } from '../../users/users.service';

import * as bcrypt from 'bcryptjs';

import { AuthResponseDto } from '../dtos/auth-response.dto';
import { Roles } from '../roles/roles.constant';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginAsUserUseCase {
  constructor(
    private readonly generateTokensUseCase: GenerateTokensUseCase,
    private readonly userService: UsersService,
  ) {}

  async execute(body: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findOne({
      email: body.email,
    });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    const { accessToken, refreshToken } =
      await this.generateTokensUseCase.execute({
        id: user._id.toString(),
        role: Roles.user,
      });

    return plainToInstance(AuthResponseDto, {
      accessToken,
      refreshToken,
    });
  }
}
