import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { envSchema } from './common/configuration/env-schema-validation';
import configMapping from './common/configuration/config-mapping';
import { EnvironmentInterface } from './common/configuration/environment.interface';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
import { SystemAdminsModule } from './system-admins/system-admins.module';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { UnitsModule } from './units/units.module';
import { FilesUploadModule } from './files-upload/files-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        uri: configService.getOrThrow('mongodbUri'),
      }),
    }),

    AuthModule,
    UsersModule,
    CountriesModule,
    CitiesModule,
    CurrenciesModule,
    UnitCategoriesModule,
    AppSettingsModule,
    SystemAdminsModule,
    UnitsModule,
    FilesUploadModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,

    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
