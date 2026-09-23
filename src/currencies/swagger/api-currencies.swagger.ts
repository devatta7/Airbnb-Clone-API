import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';

const currencyIdParam = ApiParam({
  name: 'id',
  description: 'Currency MongoDB ID',
});

export function SwaggerCreateCurrency() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a currency' }),
    ApiBody({ type: CreateCurrencyDto }),
    ApiCreatedResponse({ type: CurrencyResponseDto }),
  );
}

export function SwaggerFindAllCurrencies() {
  return applyDecorators(
    ApiOperation({ summary: 'List currencies' }),
    ApiOkResponse({ type: CurrencyResponseDto, isArray: true }),
  );
}

export function SwaggerFindCurrency() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a currency by ID' }),
    currencyIdParam,
    ApiOkResponse({ type: CurrencyResponseDto }),
  );
}

export function SwaggerUpdateCurrency() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a currency' }),
    currencyIdParam,
    ApiBody({ type: UpdateCurrencyDto }),
    ApiOkResponse({ type: CurrencyResponseDto }),
  );
}

export function SwaggerDeleteCurrency() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a currency' }),
    currencyIdParam,
    ApiNoContentResponse({ description: 'Currency deleted successfully' }),
  );
}
