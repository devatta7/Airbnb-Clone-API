import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'common/configuration/environment.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentInterface>);
  const PORT = configService.getOrThrow<number>('port');
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
