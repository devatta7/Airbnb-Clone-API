import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { DeleteUnitPhotosDto } from '../dtos/delete-unit-photos.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { UpdateUnitDto } from '../dtos/update-unit.dto';

export function SwaggerCreateUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a unit' }),
    ApiBearerAuth(),
    ApiBody({ type: CreateUnitDto }),
    ApiCreatedResponse({ type: UnitResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid unit data or photos' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerUpdateUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a unit' }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiBody({ type: UpdateUnitDto }),
    ApiOkResponse({ type: UnitResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid unit data or ID' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerActivateUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Activate a unit' }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiOkResponse({ type: UnitResponseDto }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerDeactivateUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Deactivate a unit' }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiOkResponse({ type: UnitResponseDto }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerDeleteUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a unit' }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiNoContentResponse(),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerFindAllUnits() {
  return applyDecorators(
    ApiOperation({ summary: 'List units with filters and pagination' }),
    ApiQuery({ name: 'page', type: Number, required: false, example: 1 }),
    ApiQuery({ name: 'limit', type: Number, required: false, example: 10 }),
    ApiQuery({ name: 'ignoreLimit', type: Boolean, required: false, example: false }),
    ApiQuery({ name: 'title', type: String, required: false }),
    ApiQuery({ name: 'country', type: String, required: false }),
    ApiQuery({ name: 'city', type: String, required: false }),
    ApiQuery({ name: 'unitCategory', type: String, required: false }),
    ApiQuery({ name: 'minCostPerDay', type: Number, required: false }),
    ApiQuery({ name: 'maxCostPerDay', type: Number, required: false }),
    ApiQuery({ name: 'availability', type: Boolean, required: false }),
    ApiQuery({ name: 'isActive', type: Boolean, required: false }),
    ApiOkResponse({ description: 'Paginated list of units' }),
  );
}

export function SwaggerFindCurrentUserUnits() {
  return applyDecorators(
    ApiOperation({ summary: "List the current user's units" }),
    ApiBearerAuth(),
    ApiOkResponse({ description: "Paginated list of the current user's units" }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerFindUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a unit by ID' }),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiOkResponse({ type: UnitResponseDto }),
  );
}

export function SwaggerDeleteUnitPhotos() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete selected photos from a unit' }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiBody({ type: DeleteUnitPhotosDto }),
    ApiNoContentResponse(),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerUpdateUnitPhotos() {
  return applyDecorators(
    ApiOperation({ summary: 'Replace photos on a unit' }),
    ApiBearerAuth(),
    ApiParam({ name: 'id', description: 'Unit MongoDB ID' }),
    ApiOkResponse({ type: UnitResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid photo files' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}
