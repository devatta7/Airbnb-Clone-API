import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './common/configuration/env-schema-validation';
import configMapping from './common/configuration/config-mapping';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        uri: configService.getOrThrow('mongodbUri'),
      }),
    }),

    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
