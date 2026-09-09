import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentInterface } from '../../common/configuration/environment.interface';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class GenerateTokenUseCase {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
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
    await this.refreshTokenModel.findOneAndUpdate(
      { userId: userId },
      {
        refreshToken: hashedRefreshToken,
      },
      {
        returnDocument: 'after',
        upsert: true,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
