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
      .addTag(ApiTag.COUNTRIES)
      .addTag(ApiTag.CITIES)
      .addTag(ApiTag.CURRENCIES)
      .addTag(ApiTag.UNIT_CATEGORIES)
      .addTag(ApiTag.APP_SETTINGS)
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
