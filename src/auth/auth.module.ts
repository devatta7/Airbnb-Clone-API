import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../common/configuration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';

import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { RegisterUseCase } from './use-cases/register.usecase';
import { GenerateTokenUseCase } from './use-cases/generateTokens.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refreshToken.usecase';

@Module({
  imports: [
    UsersModule,

    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),

    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        secret: configService.getOrThrow('jwtSecret'),

        signOptions: {
          expiresIn: configService.getOrThrow('accessTokenExpiresIn'),
        },
      }),
    }),
  ],

  providers: [
    AuthService,
    RegisterUseCase,
    GenerateTokenUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
