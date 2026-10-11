import { Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityUseCase } from './use-cases/check-availbility.usecase';
import { BookingRequestUseCase } from './use-cases/booking-request.usecase';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { CurrentUserData } from '../auth/interfaces/principal.interface';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly bookingRequestUseCase: BookingRequestUseCase,
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
}
