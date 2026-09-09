import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { RefreshToken } from '../schemas/refresh-token.schema';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { GenerateTokenUseCase } from './generateTokens.usecase';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,

    private readonly generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  async execute(body: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
      }>(body.refreshToken);

      const userId = payload.sub;

      const storedToken = await this.refreshTokenModel.findOne({
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

      return await this.generateTokenUseCase.execute(userId);
    } catch {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}
