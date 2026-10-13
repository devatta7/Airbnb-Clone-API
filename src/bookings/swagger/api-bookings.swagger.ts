import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingUserType } from '../enums/booking-user-type.enum';

export function SwaggerCreateBooking() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a booking for the authenticated guest' }),
    ApiBody({ type: BookingRequestDto }),
    ApiCreatedResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({
      description: 'Invalid booking request or dates unavailable',
    }),
  );
}

export function SwaggerCheckAvailability() {
  return applyDecorators(
    ApiOperation({
      summary: 'Check unit availability and calculate booking cost',
    }),
    ApiQuery({
      name: 'unit',
      type: String,
      required: true,
      example: '507f1f77bcf86cd799439011',
    }),
    ApiQuery({
      name: 'checkIn',
      type: String,
      required: true,
      example: '2027-01-10T00:00:00.000Z',
    }),
    ApiQuery({
      name: 'checkOut',
      type: String,
      required: true,
      example: '2027-01-14T00:00:00.000Z',
    }),
    ApiQuery({
      name: 'adultsCount',
      type: Number,
      required: false,
      example: 2,
    }),
    ApiQuery({ name: 'kidsCount', type: Number, required: false, example: 0 }),
    ApiOkResponse({ type: AvailabilityResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid availability query' }),
    ApiNotFoundResponse({ description: 'Unit not found' }),
  );
}

export function SwaggerFindAllBookings() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'List all bookings (admin only)' }),
    ApiQuery({ name: 'page', type: Number, required: false, example: 1 }),
    ApiQuery({ name: 'limit', type: Number, required: false, example: 10 }),
    ApiQuery({ name: 'ignoreLimit', type: Boolean, required: false }),
    ApiOkResponse({ description: 'Paginated list of bookings' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerFindMyBookings() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: "List the current user's bookings as guest or host",
    }),
    ApiQuery({ name: 'page', type: Number, required: false, example: 1 }),
    ApiQuery({ name: 'limit', type: Number, required: false, example: 10 }),
    ApiQuery({ name: 'ignoreLimit', type: Boolean, required: false }),
    ApiQuery({
      name: 'userType',
      enum: BookingUserType,
      required: false,
      example: BookingUserType.GUEST,
    }),
    ApiOkResponse({
      description: "Paginated list of the current user's bookings",
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}
