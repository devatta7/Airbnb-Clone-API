import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiTag } from './constant';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Airbnb Clone API')
      .setDescription('Airbnb Clone API Documentation')
      .setVersion('1.0')
      .addTag(ApiTag.AUTH)
      .addTag(ApiTag.USERS)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    });
  }
}
