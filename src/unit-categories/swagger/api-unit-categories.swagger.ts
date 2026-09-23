import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
    ApiBody({ type: CreateUnitCategoryDto }),
    ApiCreatedResponse({ type: UnitCategoryResponseDto }),
  );
}

export function SwaggerFindAllUnitCategories() {
  return applyDecorators(
    ApiOperation({ summary: 'List unit categories' }),
    ApiOkResponse({ type: UnitCategoryResponseDto, isArray: true }),
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
    unitCategoryIdParam,
    ApiBody({ type: UpdateUnitCategoryDto }),
    ApiOkResponse({ type: UnitCategoryResponseDto }),
  );
}

export function SwaggerDeleteUnitCategory() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a unit category' }),
    unitCategoryIdParam,
    ApiNoContentResponse({ description: 'Unit category deleted successfully' }),
  );
}
