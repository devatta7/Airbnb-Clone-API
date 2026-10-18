import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTag } from '../common/swagger/constant';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { BookingsService } from './bookings.service';
import { SwaggerCheckAvailability } from './swagger/api-bookings.swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as UserRole } from '../auth/roles/roles.constant';
import { CurrentAccount } from '../auth/decorators/current-account.decorators';
import type { IPrincipal } from '../auth/interfaces/principal.interface';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { SwaggerCreateBooking } from './swagger/api-bookings.swagger';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import {
  SwaggerFindAllBookings,
  SwaggerFindMyBookings,
  SwaggerFindBookingById,
} from './swagger/api-bookings.swagger';
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
import { CancelBookingByGuestDto } from './dtos/cancel-booking-by-guest.dto';
import { SwaggerCancelBookingByGuest } from './swagger/api-bookings.swagger';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';
import { SwaggerChangeBookingStatusByHost } from './swagger/api-bookings.swagger';
import { SwaggerUpdateBookingByGuest } from './swagger/api-bookings.swagger';
import { GuestReviewDto } from './dtos/guest-review.dto';
import { SwaggerReviewBooking } from './swagger/api-bookings.swagger';

@ApiTags(ApiTag.BOOKINGS)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles(UserRole.USER)
  @SwaggerCreateBooking()
  create(
    @Body() body: BookingRequestDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.create(body, account.user);
  }

  @Get('check-availability')
  @Public()
  @HttpCode(HttpStatus.OK)
  @SwaggerCheckAvailability()
  checkAvailability(
    @Query() body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return this.bookingsService.checkAvailability(body);
  }

  @Get()
  @Roles(UserRole.SYSTEM_ADMIN)
  @SwaggerFindAllBookings()
  findAll(
    @Query() query: FindAllBookingsDto,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return this.bookingsService.findAll(query);
  }

  @Get('me')
  @Roles(UserRole.USER)
  @SwaggerFindMyBookings()
  findMine(
    @Query() query: FindAllBookingsDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return this.bookingsService.findMine(query, account.user);
  }

  @Get(':bookingId')
  @Roles(UserRole.USER, UserRole.SYSTEM_ADMIN)
  @SwaggerFindBookingById()
  findById(
    @Param('bookingId', ParseObjectIdPipe) bookingId: string,
    @CurrentAccount() account: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.findById(bookingId, account);
  }

  @Patch(':id')
  @Roles(UserRole.USER)
  @SwaggerUpdateBookingByGuest()
  updateByGuest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateBookingRequestDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.updateByGuest(id, body, account.user);
  }

  @Patch(':id/cancel')
  @Roles(UserRole.USER)
  @SwaggerCancelBookingByGuest()
  cancelByGuest(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: CancelBookingByGuestDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.cancelByGuest(id, body, account.user);
  }

  @Patch(':id/status')
  @Roles(UserRole.USER)
  @SwaggerChangeBookingStatusByHost()
  changeStatusByHost(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: ChangeBookingStatusDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.changeStatusByHost(id, body, account.user);
  }

  @Patch(':id/review')
  @Roles(UserRole.USER)
  @SwaggerReviewBooking()
  review(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: GuestReviewDto,
    @CurrentAccount() account: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.bookingsService.review(id, body, account.user);
  }
}
