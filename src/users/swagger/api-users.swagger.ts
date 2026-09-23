import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

export function SwaggerCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a user' }),
    ApiBody({ type: CreateUserDto }),
    ApiCreatedResponse({
      type: UserResponseDto,
      description: 'User created successfully',
    }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
    ApiConflictResponse({
      description: 'Email or phone number already exists',
    }),
  );
}
