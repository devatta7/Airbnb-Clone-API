import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';
import { UpsertAppSettingsDto } from '../dtos/upsert-app-settings.dto';

export function SwaggerFindAppSettings() {
  return applyDecorators(
    ApiOperation({ summary: 'Get application settings' }),
    ApiOkResponse({ type: AppSettingsResponseDto }),
  );
}

export function SwaggerUpsertAppSettings() {
  return applyDecorators(
    ApiOperation({ summary: 'Create or update application settings' }),
    ApiBody({ type: UpsertAppSettingsDto }),
    ApiOkResponse({ type: AppSettingsResponseDto }),
    ApiBadRequestResponse({ description: 'Request body validation failed' }),
  );
}
