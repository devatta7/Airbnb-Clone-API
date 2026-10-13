import { Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityUseCase } from './use-cases/check-availbility.usecase';
import { BookingRequestUseCase } from './use-cases/booking-request.usecase';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { CurrentUserData } from '../auth/interfaces/principal.interface';
import { FindAllBookingsUseCase } from './use-cases/find-all-bookings.usecase';
import { FindMyBookingsUseCase } from './use-cases/find-my-bookings.usecase';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { PaginatedResult } from '../common/data-access/base-repository';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly bookingRequestUseCase: BookingRequestUseCase,
    private readonly findAllBookingsUseCase: FindAllBookingsUseCase,
    private readonly findMyBookingsUseCase: FindMyBookingsUseCase,
  ) {}

  create(
    body: BookingRequestDto,
    guest: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.bookingRequestUseCase.execute(body, guest);
  }

  checkAvailability(
    body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return this.checkAvailabilityUseCase.execute(body);
  }

  findAll(
    query: FindAllBookingsDto,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return this.findAllBookingsUseCase.execute(query);
  }

  findMine(
    query: FindAllBookingsDto,
    currentUser: CurrentUserData,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    return this.findMyBookingsUseCase.execute(query, currentUser);
  }
}
