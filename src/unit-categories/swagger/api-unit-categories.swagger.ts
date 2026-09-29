import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';

const unitCategoryIdParam = ApiParam({
  name: 'id',
  description: 'Unit category MongoDB ID',
});

export function SwaggerCreateUnitCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a unit category' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateUnitCategoryDto }),
    ApiCreatedResponse({ type: UnitCategoryResponseDto }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerFindAllUnitCategories() {
  return applyDecorators(
    ApiOperation({ summary: 'List unit categories' }),
    ApiOkResponse({
      schema: {
        example: {
          data: [{ id: '507f1f77bcf86cd799439011', name: 'Apartment' }],
          totalCount: 1,
          page: 1,
          limit: 10,
          pageCount: 1,
        },
      },
    }),
  );
}

export function SwaggerFindUnitCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a unit category by ID' }),
    unitCategoryIdParam,
    ApiOkResponse({ type: UnitCategoryResponseDto }),
  );
}

export function SwaggerUpdateUnitCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a unit category' }),
    ApiBearerAuth(),
    unitCategoryIdParam,
    ApiBody({ type: UpdateUnitCategoryDto }),
    ApiOkResponse({ type: UnitCategoryResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid ID or request body' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerDeleteUnitCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a unit category' }),
    ApiBearerAuth(),
    unitCategoryIdParam,
    ApiNoContentResponse({ description: 'Unit category deleted successfully' }),
    ApiBadRequestResponse({ description: 'Invalid unit category ID' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}
