import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SystemAdminsModule } from '../system-admins/system-admins.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../common/configuration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';

import { RefreshTokenSchema } from './schema/refresh-token.schema';
import { RegisterUseCase } from './use-cases/register.usecase';
import { GenerateTokenUseCase } from './use-cases/generateTokens.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refreshToken.usecase';
import { ModelNames } from '../common/data-access/model-names.enum';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { LoginAsUserUseCase } from './use-cases/login-as-user.usecase';
import { LoginAsSystemAdminUseCase } from './use-cases/login-as-system-admin.usecase';

@Module({
  imports: [
    UsersModule,
    SystemAdminsModule,

    MongooseModule.forFeature([
      {
        name: ModelNames.REFRESH_TOKENS,
        schema: RefreshTokenSchema,
      },
    ]),

    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        secret: configService.getOrThrow('jwtSecret'),
      }),
    }),
  ],

  providers: [
    AuthService,
    RegisterUseCase,
    GenerateTokenUseCase,
    LoginUseCase,
    LoginAsUserUseCase,
    LoginAsSystemAdminUseCase,
    RefreshTokenUseCase,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
