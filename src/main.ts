import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService<EnvironmentInterface>);

  const PORT = configService.getOrThrow<number>('port');

  await app.listen(PORT);
}

bootstrap();
