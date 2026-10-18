import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import {
  ApiPaginatedResponse,
  ApiPaginationQuery,
} from '../../common/swagger/paginated-response';

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
    ApiPaginationQuery(),
    ApiQuery({
      name: 'name',
      type: String,
      required: false,
      example: 'Apartment',
    }),
    ApiPaginatedResponse(
      UnitCategoryResponseDto,
      'Paginated list of unit categories',
    ),
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
