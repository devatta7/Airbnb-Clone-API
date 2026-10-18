import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiConsumes,
  ApiBody,
  ApiExtraModels,
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
import {
  ApiPaginatedResponse,
  ApiPaginationQuery,
} from '../../common/swagger/paginated-response';

export function SwaggerCreateUnit() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a unit' }),
    ApiBearerAuth(),
    ApiExtraModels(CreateUnitDto),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        allOf: [{ $ref: '#/components/schemas/CreateUnitDto' }],
        properties: {
          photos: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          },
        },
      },
    }),
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
    ApiPaginationQuery(),
    ApiQuery({ name: 'title', type: String, required: false }),
    ApiQuery({ name: 'country', type: String, required: false }),
    ApiQuery({ name: 'city', type: String, required: false }),
    ApiQuery({ name: 'unitCategory', type: String, required: false }),
    ApiQuery({ name: 'minCostPerDay', type: Number, required: false }),
    ApiQuery({ name: 'maxCostPerDay', type: Number, required: false }),
    ApiQuery({ name: 'availability', type: Boolean, required: false }),
    ApiQuery({ name: 'isActive', type: Boolean, required: false }),
    ApiPaginatedResponse(UnitResponseDto, 'Paginated list of units'),
  );
}

export function SwaggerFindCurrentUserUnits() {
  return applyDecorators(
    ApiOperation({ summary: "List the current user's units" }),
    ApiBearerAuth(),
    ApiPaginationQuery(),
    ApiQuery({ name: 'title', type: String, required: false }),
    ApiQuery({ name: 'country', type: String, required: false }),
    ApiQuery({ name: 'city', type: String, required: false }),
    ApiQuery({ name: 'unitCategory', type: String, required: false }),
    ApiQuery({ name: 'minCostPerDay', type: Number, required: false }),
    ApiQuery({ name: 'maxCostPerDay', type: Number, required: false }),
    ApiQuery({ name: 'availability', type: Boolean, required: false }),
    ApiQuery({ name: 'isActive', type: Boolean, required: false }),
    ApiPaginatedResponse(
      UnitResponseDto,
      "Paginated list of the current user's units",
    ),
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
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          photos: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          },
        },
        required: ['photos'],
      },
    }),
    ApiOkResponse({ type: UnitResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid photo files' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}
