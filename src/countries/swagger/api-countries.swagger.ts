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

import { CountryResponseDto } from '../dtos/country-response.dto';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import {
  ApiPaginatedResponse,
  ApiPaginationQuery,
} from '../../common/swagger/paginated-response';

const countryIdParam = ApiParam({
  name: 'id',
  description: 'Country MongoDB ID',
});

export function SwaggerCreateCountry() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a country' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateCountryDto }),
    ApiCreatedResponse({ type: CountryResponseDto }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerFindAllCountries() {
  return applyDecorators(
    ApiOperation({ summary: 'List countries' }),
    ApiPaginationQuery(),
    ApiQuery({ name: 'name', type: String, required: false, example: 'Egypt' }),
    ApiQuery({
      name: 'countryCode',
      type: String,
      required: false,
      example: 'EG',
    }),
    ApiPaginatedResponse(CountryResponseDto, 'Paginated list of countries'),
  );
}

export function SwaggerFindCountry() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a country by ID' }),
    countryIdParam,
    ApiOkResponse({ type: CountryResponseDto }),
  );
}

export function SwaggerUpdateCountry() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a country' }),
    ApiBearerAuth(),
    countryIdParam,
    ApiBody({ type: UpdateCountryDto }),
    ApiOkResponse({ type: CountryResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid ID or request body' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerDeleteCountry() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a country' }),
    ApiBearerAuth(),
    countryIdParam,
    ApiNoContentResponse({ description: 'Country deleted successfully' }),
    ApiBadRequestResponse({ description: 'Invalid country ID' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}
