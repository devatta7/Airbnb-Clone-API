import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { CancelBookingByGuestDto } from '../dtos/cancel-booking-by-guest.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { CancelBy } from '../enums/cancel-by.enum';
import { BookingRepository } from '../repository/booking.repository';

@Injectable()
export class CancelBookingByGuestUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(
    id: string,
    body: CancelBookingByGuestDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');

    if (String(booking.guest) !== String(user._id)) {
      throw new ForbiddenException(
        'You are not authorized to cancel this booking',
      );
    }

    if (
      booking.status === BookingStatus.CANCELLED ||
      booking.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException('Booking cannot be canceled');
    }

    const updatedBooking = await this.bookingRepository.findOneAndUpdate(
      {
        _id: id,
        guest: user._id,
        status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
      {
        $set: {
          status: BookingStatus.CANCELLED,
          cancellationReason: body?.cancellationReason,
          cancellationDate: new Date(),
          cancelBy: CancelBy.GUEST,
        },
      },
      { runValidators: true },
    );

    if (!updatedBooking) {
      throw new BadRequestException('Booking can no longer be canceled');
    }

    return plainToInstance(BookingResponseDto, updatedBooking.toObject(), {
      excludeExtraneousValues: true,
    });
  }
}
