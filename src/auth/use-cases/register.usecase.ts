import { Injectable } from '@nestjs/common';

import { RegisterDto } from '../dtos/register.dto';
import { UsersService } from '../../users/users.service';
import { GenerateTokenUseCase } from './generate-tokens.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../roles/roles.constant';
import { OtpService } from '../../otp/otp.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userService: UsersService,
    private readonly generateToken: GenerateTokenUseCase,
    private readonly otpService: OtpService,
  ) {}

  async execute(body: RegisterDto): Promise<AuthResponseDto> {
    await this.otpService.assertEmailVerified(body.email);
    const user = await this.userService.create(body);
    await this.otpService.consumeVerifiedOtp(body.email);

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
