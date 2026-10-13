import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { UnitsService } from '../../units/units.service';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { BookingRepository } from '../repository/booking.repository';
import { Booking } from '../schema/booking.schema';
import { BookingCalculationUseCase } from './booking-calculation.usecase';
import { BookingValidationUseCase } from './booking-vaildation.usecase';
import dayjs from 'dayjs';

@Injectable()
export class BookingRequestUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingCalculationUseCase: BookingCalculationUseCase,
    private readonly unitsService: UnitsService,
  ) {}

  async execute(
    body: BookingRequestDto,
    guest: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const availabilityRequest: CheckAvailabilityDto = {
      unit: body.unit,
      checkIn: dayjs(body.checkIn).toDate(),
      checkOut: dayjs(body.checkOut).toDate(),
      adultsCount: body.adultsCount ?? 1,
      kidsCount: body.kidsCount ?? 0,
    };

    await this.bookingValidationUseCase.execute(availabilityRequest, guest);

    const [unit, calculation] = await Promise.all([
      this.unitsService.findOne(body.unit),
      this.bookingCalculationUseCase.execute(availabilityRequest),
    ]);

    const bookingData: Partial<Booking> = {
      unit: body.unit,
      guest: guest._id,
      host: unit.user,
      checkInDate: availabilityRequest.checkIn,
      checkOutDate: availabilityRequest.checkOut,
      adultsCount: availabilityRequest.adultsCount,
      kidsCount: availabilityRequest.kidsCount,
      notes: body.notes,
      pricePerDay: calculation.pricePerDay,
      daysCount: calculation.daysCount,
      bookingAmount: calculation.bookingAmount,
      vat: calculation.vat,
      vatAmount: calculation.vatAmount,
      totalAmount: calculation.totalAmount,
    };
    const booking = await this.bookingRepository.create(bookingData);

    return plainToInstance(BookingResponseDto, booking.toObject(), {
      excludeExtraneousValues: true,
    });
  }
}
