import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './common/swagger/swagger-config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: process.env.NODE_ENV == 'production',
    }),
  });

  // This API uses bearer tokens and JSON payloads. Swagger's UI uses inline
  // assets, so CSP is left to a separately configured docs host if needed.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      hsts: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  const configService = app.get(ConfigService<EnvironmentInterface>);
  const corsOrigins = configService.getOrThrow<string[]>('corsOrigins');
  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  SwaggerConfig.setup(app);

  const PORT = configService.getOrThrow<number>('port');

  await app.listen(PORT);
}

bootstrap();
