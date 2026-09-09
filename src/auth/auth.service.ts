import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';

import { Model } from 'mongoose';

import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../common/configuration/environment.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,

    private readonly jwtService: JwtService,

    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,

    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  private async generateToken(userId: string) {
    // Access Token
    const accessToken = await this.jwtService.signAsync({
      sub: userId,
    });

    // Refresh Token
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

  async register(body: RegisterDto) {
    const user = await this.userService.create(body);

    return await this.generateToken(user._id.toString());
  }

  async login(body: LoginDto) {
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

    return await this.generateToken(user._id.toString());
  }

  async refreshToken(body: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
      }>(body.refreshToken);

      const userId = payload.sub;

      const storedToken = await this.refreshTokenModel.findOne({
        user: userId,
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

      return await this.generateToken(userId);
    } catch {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}
