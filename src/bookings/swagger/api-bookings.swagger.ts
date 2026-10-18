import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { CancelBookingByGuestDto } from '../dtos/cancel-booking-by-guest.dto';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';
import { UpdateBookingRequestDto } from '../dtos/update-booking-request.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingUserType } from '../enums/booking-user-type.enum';
import { GuestReviewDto } from '../dtos/guest-review.dto';

export function SwaggerCreateBooking() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Create a booking for the authenticated guest' }),
    ApiBody({ type: BookingRequestDto }),
    ApiCreatedResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({
      description: 'Invalid booking request or dates unavailable',
    }),
    ApiNotFoundResponse({ description: 'Unit not found' }),
    ApiForbiddenResponse({
      description: 'The guest cannot book their own unit',
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
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
    ApiQuery({ name: 'status', enum: BookingStatus, required: false }),
    ApiQuery({ name: 'unit', type: String, required: false }),
    ApiQuery({ name: 'checkIn', type: String, required: false }),
    ApiQuery({ name: 'checkOut', type: String, required: false }),
    ApiExtraModels(BookingResponseDto),
    ApiOkResponse({
      description: 'Paginated list of bookings',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(BookingResponseDto) },
          },
          totalCount: { type: 'number' },
          page: { type: 'number', nullable: true },
          limit: { type: 'number', nullable: true },
          pageCount: { type: 'number' },
        },
      },
    }),
    ApiForbiddenResponse({ description: 'Administrator access is required' }),
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
    ApiQuery({ name: 'status', enum: BookingStatus, required: false }),
    ApiQuery({ name: 'unit', type: String, required: false }),
    ApiQuery({ name: 'checkIn', type: String, required: false }),
    ApiQuery({ name: 'checkOut', type: String, required: false }),
    ApiQuery({
      name: 'userType',
      enum: BookingUserType,
      required: false,
      example: BookingUserType.GUEST,
    }),
    ApiExtraModels(BookingResponseDto),
    ApiOkResponse({
      description: "Paginated list of the current user's bookings",
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(BookingResponseDto) },
          },
          totalCount: { type: 'number' },
          page: { type: 'number', nullable: true },
          limit: { type: 'number', nullable: true },
          pageCount: { type: 'number' },
        },
      },
    }),
    ApiForbiddenResponse({ description: 'User access is required' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerFindBookingById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get booking details by ID' }),
    ApiParam({ name: 'bookingId', description: 'Booking MongoDB ID' }),
    ApiOkResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({ description: 'Invalid booking ID' }),
    ApiNotFoundResponse({ description: 'Booking not found' }),
    ApiForbiddenResponse({
      description: 'Only a booking participant or administrator can view it',
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerCancelBookingByGuest() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Cancel a booking as the guest' }),
    ApiParam({ name: 'id', description: 'Booking MongoDB ID' }),
    ApiBody({ type: CancelBookingByGuestDto, required: false }),
    ApiOkResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({
      description: 'Booking is already canceled or completed',
    }),
    ApiNotFoundResponse({ description: 'Booking not found' }),
    ApiForbiddenResponse({
      description: 'Only the booking guest can cancel it',
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerChangeBookingStatusByHost() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Confirm, cancel, or complete a booking as the host',
    }),
    ApiParam({ name: 'id', description: 'Booking MongoDB ID' }),
    ApiBody({ type: ChangeBookingStatusDto }),
    ApiOkResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({
      description:
        'Invalid booking status transition (pending to confirmed/cancelled; confirmed to cancelled/completed)',
    }),
    ApiNotFoundResponse({ description: 'Booking not found' }),
    ApiForbiddenResponse({
      description: 'Only the booking host can change its status',
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerUpdateBookingByGuest() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update a pending booking as the guest' }),
    ApiParam({ name: 'id', description: 'Booking MongoDB ID' }),
    ApiBody({ type: UpdateBookingRequestDto }),
    ApiOkResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({
      description:
        'Invalid update, unavailable dates, or booking is not pending',
    }),
    ApiNotFoundResponse({ description: 'Booking not found' }),
    ApiForbiddenResponse({
      description: 'Only the booking guest can update it',
    }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}

export function SwaggerReviewBooking() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Review a completed booking as the guest' }),
    ApiParam({ name: 'id', description: 'Booking MongoDB ID' }),
    ApiBody({ type: GuestReviewDto }),
    ApiOkResponse({ type: BookingResponseDto }),
    ApiBadRequestResponse({
      description: 'Booking is not completed, already reviewed, or rating is invalid',
    }),
    ApiNotFoundResponse({ description: 'Booking or unit not found' }),
    ApiForbiddenResponse({ description: 'Only the booking guest can review it' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}
