import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { EnvironmentInterface } from '../../common/configuration/environment.interface';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(payload: JwtPayload) {
    const { id } = payload;

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('accessTokenExpiresIn'),
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
        role: payload.role,
      },
      {
        expiresIn: this.configService.getOrThrow('refreshTokenExpiresIn'),
      },
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.refreshTokenRepository.findOneAndUpdate(
      { userId: id },
      {
        userId: id,
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
