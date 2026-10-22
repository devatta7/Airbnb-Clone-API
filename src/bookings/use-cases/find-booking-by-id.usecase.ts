import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IPrincipal } from '../../auth/interfaces/principal.interface';
import { Roles } from '../../auth/roles/roles.constant';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repository/booking.repository';
import { CheckBookingAuthUseCase } from './check-booking-auth.usecase';

@Injectable()
export class FindBookingByIdUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly checkBookingAuthUseCase: CheckBookingAuthUseCase,
  ) {}

  async execute(
    bookingId: string,
    principal: IPrincipal,
  ): Promise<BookingResponseDto> {
    if (principal.role === Roles.user) {
      await this.checkBookingAuthUseCase.execute(bookingId, principal.user._id);
    }

    const booking = await this.bookingRepository.findById(bookingId, {
      populate: [
        { path: 'unit', select: 'title' },
        { path: 'guest', select: 'name phoneNumber' },
        { path: 'host', select: 'name phoneNumber' },
      ],
    });
    if (!booking) throw new NotFoundException('Booking not found');

    return plainToInstance(BookingResponseDto, booking.toObject());
  }
}
