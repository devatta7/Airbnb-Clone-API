import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentInterface } from '../../common/configuration/environment.interface';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(userId: string) {
    const accessToken = await this.jwtService.signAsync({
      sub: userId,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        expiresIn: this.configService.getOrThrow('refreshTokenExpiresIn'),
      },
    );

    // Hash Refresh Token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Save / Update Refresh Token
    await this.refreshTokenRepository.findOneAndUpdate(
      { userId: userId },
      {
        refreshToken: hashedRefreshToken,
      },
      {
        upsert: true,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
