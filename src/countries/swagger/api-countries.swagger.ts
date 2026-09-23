import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { CountryResponseDto } from '../dtos/country-response.dto';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';

const countryIdParam = ApiParam({
  name: 'id',
  description: 'Country MongoDB ID',
});

export function SwaggerCreateCountry() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a country' }),
    ApiBody({ type: CreateCountryDto }),
    ApiCreatedResponse({ type: CountryResponseDto }),
  );
}

export function SwaggerFindAllCountries() {
  return applyDecorators(
    ApiOperation({ summary: 'List countries' }),
    ApiOkResponse({ type: CountryResponseDto, isArray: true }),
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
    countryIdParam,
    ApiBody({ type: UpdateCountryDto }),
    ApiOkResponse({ type: CountryResponseDto }),
  );
}

export function SwaggerDeleteCountry() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a country' }),
    countryIdParam,
    ApiNoContentResponse({ description: 'Country deleted successfully' }),
  );
}
