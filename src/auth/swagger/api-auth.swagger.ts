import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RegisterDto } from '../dtos/register.dto';

export function SwaggerRegister() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      description: 'Creates an account and returns access and refresh tokens.',
    }),
    ApiBody({ type: RegisterDto }),
    ApiCreatedResponse({
      type: AuthResponseDto,
      description: 'User registered successfully',
    }),
    ApiBadRequestResponse({
      description: 'Request body validation failed',
      schema: {
        example: {
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Email or phone number already exists',
      schema: {
        example: {
          statusCode: 409,
          message: 'Email or phone number already exists',
          error: 'Conflict',
        },
      },
    }),
  );
}

export function SwaggerLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Log in',
      description:
        'Authenticates a user and returns access and refresh tokens.',
    }),
    ApiBody({ type: LoginDto }),
    ApiOkResponse({
      type: AuthResponseDto,
      description: 'User logged in successfully',
    }),
    ApiBadRequestResponse({
      description: 'Invalid credentials or request body validation failed',
      schema: {
        example: {
          statusCode: 400,
          message: 'Invalid Credentials',
          error: 'Bad Request',
        },
      },
    }),
  );
}

export function SwaggerRefreshToken() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh authentication tokens',
      description:
        'Issues a new access token and refresh token from a valid refresh token.',
    }),
    ApiBody({ type: RefreshTokenDto }),
    ApiOkResponse({
      type: AuthResponseDto,
      description: 'Tokens refreshed successfully',
    }),
    ApiBadRequestResponse({
      description: 'Request body validation failed',
      schema: {
        example: {
          statusCode: 400,
          message: ['refreshToken should not be empty'],
          error: 'Bad Request',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Invalid refresh token',
      schema: {
        example: {
          statusCode: 401,
          message: 'Invalid Refresh Token',
          error: 'Unauthorized',
        },
      },
    }),
  );
}
