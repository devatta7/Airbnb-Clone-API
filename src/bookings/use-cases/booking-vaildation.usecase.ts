import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepository } from '../repository/booking.repository';
import dayjs from 'dayjs';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { UnitsService } from '../../units/units.service';
import { BookingStatus } from '../enums/booking-status.enum';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';

@Injectable()
export class BookingValidationUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly unitsService: UnitsService,
  ) {}

  async execute(
    body: CheckAvailabilityDto,
    guest?: CurrentUserData,
  ): Promise<void> {
    const checkIn = dayjs(body.checkIn);
    const checkOut = dayjs(body.checkOut);

    this.validateDates(checkIn, checkOut);
    this.validateCheckInDate(checkIn);

    const unit = await this.unitsService.findOne(body.unit);

    if (guest && String(unit.user) === String(guest._id)) {
      throw new BadRequestException('You cannot book your own unit');
    }

    this.validateGuestsCount(
      unit.adultsCount,
      unit.kidsCount,
      body.adultsCount ?? 0,
      body.kidsCount ?? 0,
    );

    await this.validateBookingAvailability(
      body.unit,
      checkIn.toDate(),
      checkOut.toDate(),
    );
  }

  private validateDates(checkIn: dayjs.Dayjs, checkOut: dayjs.Dayjs): void {
    if (!checkIn.isValid() || !checkOut.isValid()) {
      throw new BadRequestException('Invalid check-in or check-out date');
    }

    if (!checkOut.isAfter(checkIn)) {
      throw new BadRequestException(
        'Check-out date must be after check-in date',
      );
    }
  }

  private validateCheckInDate(checkIn: dayjs.Dayjs): void {
    if (checkIn.isBefore(dayjs().startOf('day'))) {
      throw new BadRequestException('Check-in date cannot be in the past');
    }
  }

  private validateGuestsCount(
    maxAdults: number,
    maxKids: number,
    adultsCount: number,
    kidsCount: number,
  ): void {
    if (adultsCount < 0 || kidsCount < 0) {
      throw new BadRequestException('Guest counts cannot be negative');
    }

    if (adultsCount > maxAdults) {
      throw new BadRequestException(
        `The unit can accommodate a maximum of ${maxAdults} adults`,
      );
    }

    if (kidsCount > maxKids) {
      throw new BadRequestException(
        `The unit can accommodate a maximum of ${maxKids} kids`,
      );
    }
  }

  private async validateBookingAvailability(
    unitId: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<void> {
    const overlappingBookings = await this.bookingRepository.find({
      unit: unitId,
      status: {
        $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn },
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException('The selected dates are already booked');
    }
  }
}
