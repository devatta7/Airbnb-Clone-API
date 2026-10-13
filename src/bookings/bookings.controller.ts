import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
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
} from './swagger/api-bookings.swagger';

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
}
