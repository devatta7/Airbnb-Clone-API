import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { GenerateTokenUseCase } from './generateTokens.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';

import { plainToInstance } from 'class-transformer';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,

    private readonly refreshTokenRepository: RefreshTokenRepository,

    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: RefreshTokenDto): Promise<AuthResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
      }>(body.refreshToken);

      const userId = payload.sub;

      const storedToken = await this.refreshTokenRepository.findOne({
        userId,
      });

      if (!storedToken) {
        throw new UnauthorizedException('Invalid Refresh Token');
      }

      const isTokenMatched = await bcrypt.compare(
        body.refreshToken,
        storedToken.refreshToken,
      );

      if (!isTokenMatched) {
        throw new UnauthorizedException('Invalid Refresh Token');
      }

      const { accessToken, refreshToken } =
        await this.generateTokenUseCase.execute(userId);

      return plainToInstance(AuthResponseDto, {
        accessToken,
        refreshToken,
      });
    } catch {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}
