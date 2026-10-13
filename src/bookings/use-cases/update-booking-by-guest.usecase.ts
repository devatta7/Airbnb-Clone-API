import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { UpdateBookingRequestDto } from '../dtos/update-booking-request.dto';
import { BookingRepository } from '../repository/booking.repository';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingCalculationUseCase } from './booking-calculation.usecase';
import { BookingValidationUseCase } from './booking-vaildation.usecase';

@Injectable()
export class UpdateBookingByGuestUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingCalculationUseCase: BookingCalculationUseCase,
  ) {}

  async execute(
    id: string,
    body: UpdateBookingRequestDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');

    if (String(booking.guest) !== String(user._id)) {
      throw new ForbiddenException(
        'You are not authorized to update this booking',
      );
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Only pending bookings can be updated');
    }

    if (Object.keys(body).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

    const hasCheckIn = body.checkIn !== undefined;
    const hasCheckOut = body.checkOut !== undefined;
    if (hasCheckIn && !hasCheckOut) {
      throw new BadRequestException(
        'Check-out date is required when check-in date is provided',
      );
    }
    if (hasCheckOut && !hasCheckIn) {
      throw new BadRequestException(
        'Check-in date is required when check-out date is provided',
      );
    }

    const hasDates = hasCheckIn && hasCheckOut;
    const hasGuestCounts =
      body.adultsCount !== undefined || body.kidsCount !== undefined;

    if (hasDates || hasGuestCounts) {
      const checkIn = dayjs(body.checkIn ?? booking.checkInDate);
      const checkOut = dayjs(body.checkOut ?? booking.checkOutDate);

      if (hasDates) {
        this.bookingValidationUseCase.validateDates(checkIn, checkOut);
        this.bookingValidationUseCase.validateCheckInDate(checkIn);
      }

      await this.bookingValidationUseCase.validateBookingAvailability(
        String(booking.unit),
        checkIn.toDate(),
        checkOut.toDate(),
        id,
      );
    }

    if (hasGuestCounts) {
      await this.bookingValidationUseCase.validateCapacity(
        String(booking.unit),
        body.adultsCount ?? booking.adultsCount ?? 0,
        body.kidsCount ?? booking.kidsCount ?? 0,
      );
    }

    const update: Record<string, unknown> = {};
    if (hasDates) {
      const checkIn = dayjs(body.checkIn).toDate();
      const checkOut = dayjs(body.checkOut).toDate();
      update.checkInDate = checkIn;
      update.checkOutDate = checkOut;

      const calculation = await this.bookingCalculationUseCase.execute({
        unit: String(booking.unit),
        checkIn,
        checkOut,
      });
      Object.assign(update, calculation);
    }
    if (body.adultsCount !== undefined) update.adultsCount = body.adultsCount;
    if (body.kidsCount !== undefined) update.kidsCount = body.kidsCount;
    if (body.notes !== undefined) update.notes = body.notes;

    const updatedBooking = await this.bookingRepository.findOneAndUpdate(
      { _id: id, guest: user._id, status: BookingStatus.PENDING },
      { $set: update },
      { runValidators: true },
    );
    if (!updatedBooking) {
      throw new BadRequestException('Booking is no longer pending');
    }

    return plainToInstance(BookingResponseDto, updatedBooking.toObject(), {
      excludeExtraneousValues: true,
    });
  }
}
