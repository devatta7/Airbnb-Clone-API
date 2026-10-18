import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

/** Documents the response shape produced by TransformResponseInterceptor. */
export function ApiPaginatedResponse(
  model: Function,
  description = 'Paginated results',
) {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      description,
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          meta: {
            type: 'object',
            properties: {
              totalCount: { type: 'number', example: 24 },
              page: { type: 'number', example: 1, nullable: true },
              limit: { type: 'number', example: 10, nullable: true },
              pageCount: { type: 'number', example: 3 },
            },
          },
        },
      },
    }),
  );
}

export function ApiPaginationQuery() {
  return applyDecorators(
    ApiQuery({ name: 'page', type: Number, required: false, example: 1 }),
    ApiQuery({ name: 'limit', type: Number, required: false, example: 10 }),
    ApiQuery({
      name: 'ignoreLimit',
      type: Boolean,
      required: false,
      example: false,
    }),
  );
}
