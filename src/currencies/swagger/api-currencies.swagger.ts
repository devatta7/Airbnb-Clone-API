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
    ApiBearerAuth(),
    ApiBody({ type: CreateCurrencyDto }),
    ApiCreatedResponse({ type: CurrencyResponseDto }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerFindAllCurrencies() {
  return applyDecorators(
    ApiOperation({ summary: 'List currencies' }),
    ApiOkResponse({
      schema: {
        example: {
          data: [
            {
              id: '507f1f77bcf86cd799439011',
              name: 'Egyptian Pound',
              currencyCode: 'EGP',
            },
          ],
          totalCount: 1,
          page: 1,
          limit: 10,
          pageCount: 1,
        },
      },
    }),
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
    ApiBearerAuth(),
    currencyIdParam,
    ApiBody({ type: UpdateCurrencyDto }),
    ApiOkResponse({ type: CurrencyResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid ID or request body' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}

export function SwaggerDeleteCurrency() {
  return applyDecorators(
    ApiOperation({ summary: 'Soft delete a currency' }),
    ApiBearerAuth(),
    currencyIdParam,
    ApiNoContentResponse({ description: 'Currency deleted successfully' }),
    ApiBadRequestResponse({ description: 'Invalid currency ID' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}
