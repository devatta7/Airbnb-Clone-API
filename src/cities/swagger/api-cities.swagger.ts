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

import { CityResponseDto } from '../dtos/city-response.dto';
import { CreateCityDto } from '../dtos/create-city.dto';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { CityResponseDto as CityDto } from '../dtos/city-response.dto';
import {
  ApiPaginatedResponse,
  ApiPaginationQuery,
} from '../../common/swagger/paginated-response';

const cityIdParam = ApiParam({ name: 'id', description: 'City MongoDB ID' });

export function SwaggerCreateCity() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a city' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateCityDto }),
    ApiCreatedResponse({ type: CityResponseDto }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerFindAllCities() {
  return applyDecorators(
    ApiOperation({ summary: 'List cities' }),
    ApiPaginationQuery(),
    ApiQuery({ name: 'name', type: String, required: false, example: 'Cairo' }),
    ApiQuery({
      name: 'country',
      type: String,
      required: false,
      example: '507f1f77bcf86cd799439011',
    }),
    ApiPaginatedResponse(CityDto, 'Paginated list of cities'),
  );
}

export function SwaggerFindCity() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a city by ID' }),
    cityIdParam,
    ApiOkResponse({ type: CityResponseDto }),
  );
}

export function SwaggerUpdateCity() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a city' }),
    ApiBearerAuth(),
    cityIdParam,
    ApiBody({ type: UpdateCityDto }),
    ApiOkResponse({ type: CityResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid ID or request body' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerDeleteCity() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a city' }),
    ApiBearerAuth(),
    cityIdParam,
    ApiNoContentResponse({ description: 'City deleted successfully' }),
    ApiBadRequestResponse({ description: 'Invalid city ID' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}
