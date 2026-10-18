import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { FindUnitReviewResponseDto } from '../dtos/find-unit-review-response.dto';

export function SwaggerFindUnitReviews() {
  return applyDecorators(
    ApiExtraModels(FindUnitReviewResponseDto),
    ApiOperation({ summary: 'List reviews for a unit' }),
    ApiParam({ name: 'unitId', description: 'Unit MongoDB ID' }),
    ApiQuery({ name: 'page', type: Number, required: false, example: 1 }),
    ApiQuery({ name: 'limit', type: Number, required: false, example: 10 }),
    ApiQuery({ name: 'ignoreLimit', type: Boolean, required: false, example: false }),
    ApiOkResponse({
      description: 'Unit reviews ordered newest first',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(FindUnitReviewResponseDto) },
          },
          meta: {
            type: 'object',
            properties: {
              totalCount: { type: 'number', example: 24 },
              page: { type: 'number', example: 1 },
              limit: { type: 'number', example: 10 },
              pageCount: { type: 'number', example: 3 },
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Invalid unit ID or pagination query' }),
    ApiNotFoundResponse({ description: 'Unit not found' }),
  );
}
