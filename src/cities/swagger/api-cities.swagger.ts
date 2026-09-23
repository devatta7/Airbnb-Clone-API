import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { CityResponseDto } from '../dtos/city-response.dto';
import { CreateCityDto } from '../dtos/create-city.dto';
import { UpdateCityDto } from '../dtos/update-city.dto';

const cityIdParam = ApiParam({ name: 'id', description: 'City MongoDB ID' });

export function SwaggerCreateCity() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a city' }),
    ApiBody({ type: CreateCityDto }),
    ApiCreatedResponse({ type: CityResponseDto }),
  );
}

export function SwaggerFindAllCities() {
  return applyDecorators(
    ApiOperation({ summary: 'List cities' }),
    ApiOkResponse({ type: CityResponseDto, isArray: true }),
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
    cityIdParam,
    ApiBody({ type: UpdateCityDto }),
    ApiOkResponse({ type: CityResponseDto }),
  );
}

export function SwaggerDeleteCity() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a city' }),
    cityIdParam,
    ApiNoContentResponse({ description: 'City deleted successfully' }),
  );
}
