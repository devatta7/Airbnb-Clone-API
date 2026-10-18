import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiTag } from './constant';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Airbnb Clone API')
      .setDescription('Airbnb Clone API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag(ApiTag.AUTH)
      .addTag(ApiTag.USERS)
      .addTag(ApiTag.COUNTRIES)
      .addTag(ApiTag.CITIES)
      .addTag(ApiTag.CURRENCIES)
      .addTag(ApiTag.UNIT_CATEGORIES)
      .addTag(ApiTag.UNITS)
      .addTag(ApiTag.BOOKINGS)
      .addTag(ApiTag.APP_SETTINGS)
      .addTag(ApiTag.OTP)
      .addTag(ApiTag.FORGET_PASSWORD)
      .addTag(ApiTag.MAIL)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerConfig.wrapSuccessResponses(document);

    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    });
  }

  /** Mirrors the global response interceptor in the generated API contract. */
  private static wrapSuccessResponses(document: object): void {
    const paths = (document as any).paths as Record<string, any>;
    for (const path of Object.values(paths ?? {})) {
      for (const operation of Object.values(path ?? {}) as any[]) {
        for (const [status, response] of Object.entries(
          operation?.responses ?? {},
        )) {
          if (!/^2\d\d$/.test(status) || status === '204') continue;
          const content = (response as any).content;
          if (!content) continue;
          for (const media of Object.values(content) as any[]) {
            const schema = media.schema ?? { type: 'object' };
            if (schema.properties?.meta && schema.properties?.data) continue;
            const example = schema.example;
            media.schema = {
              type: 'object',
              properties: { data: schema },
              required: ['data'],
              ...(example === undefined ? {} : { example: { data: example } }),
            };
          }
        }
      }
    }
  }
}
