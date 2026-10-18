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
import { FindBookingByIdUseCase } from './use-cases/find-booking-by-id.usecase';
import { IPrincipal } from '../auth/interfaces/principal.interface';
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
import { UpdateBookingByGuestUseCase } from './use-cases/update-booking-by-guest.usecase';
import { CancelBookingByGuestUseCase } from './use-cases/cancel-booking-by-guest.usecase';
import { CancelBookingByGuestDto } from './dtos/cancel-booking-by-guest.dto';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';
import { ChangeBookingStatusByHostUseCase } from './use-cases/change-booking-status-by-host.usecase';
import { ReviewBookingUseCase } from './use-cases/review-booking.usecase';
import { GuestReviewDto } from './dtos/guest-review.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly bookingRequestUseCase: BookingRequestUseCase,
    private readonly findAllBookingsUseCase: FindAllBookingsUseCase,
    private readonly findMyBookingsUseCase: FindMyBookingsUseCase,
    private readonly findBookingByIdUseCase: FindBookingByIdUseCase,
    private readonly updateBookingByGuestUseCase: UpdateBookingByGuestUseCase,
    private readonly cancelBookingByGuestUseCase: CancelBookingByGuestUseCase,
    private readonly changeBookingStatusByHostUseCase: ChangeBookingStatusByHostUseCase,
    private readonly reviewBookingUseCase: ReviewBookingUseCase,
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

  findById(
    bookingId: string,
    principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    return this.findBookingByIdUseCase.execute(bookingId, principal);
  }

  updateByGuest(
    id: string,
    body: UpdateBookingRequestDto,
    currentUser: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.updateBookingByGuestUseCase.execute(id, body, currentUser);
  }

  cancelByGuest(
    id: string,
    body: CancelBookingByGuestDto,
    currentUser: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.cancelBookingByGuestUseCase.execute(id, body, currentUser);
  }

  changeStatusByHost(
    id: string,
    body: ChangeBookingStatusDto,
    currentUser: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.changeBookingStatusByHostUseCase.execute(id, body, currentUser);
  }

  review(
    id: string,
    body: GuestReviewDto,
    currentUser: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.reviewBookingUseCase.execute(id, body, currentUser);
  }
}
