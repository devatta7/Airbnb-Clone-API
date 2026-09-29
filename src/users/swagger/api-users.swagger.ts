import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

export function SwaggerCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a user' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateUserDto }),
    ApiCreatedResponse({
      type: UserResponseDto,
      description: 'User created successfully',
    }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
    ApiConflictResponse({
      description: 'Email or phone number already exists',
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
    ApiForbiddenResponse({ description: 'System admin role is required' }),
  );
}
