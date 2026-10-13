import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { CancelBy } from '../enums/cancel-by.enum';
import { BookingRepository } from '../repository/booking.repository';

@Injectable()
export class ChangeBookingStatusByHostUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(
    id: string,
    body: ChangeBookingStatusDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');

    if (String(booking.host) !== String(user._id)) {
      throw new ForbiddenException(
        'You are not authorized to change this booking status',
      );
    }

    if (
      body.status !== BookingStatus.CONFIRMED &&
      body.status !== BookingStatus.CANCELLED &&
      body.status !== BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Host can only confirm, cancel, or complete a booking',
      );
    }

    if (body.status === BookingStatus.CONFIRMED) {
      if (booking.status === BookingStatus.CONFIRMED) {
        throw new BadRequestException('Booking already approved');
      }
      if (booking.status !== BookingStatus.PENDING) {
        throw new BadRequestException('Only pending bookings can be approved');
      }
    }

    if (body.status === BookingStatus.CANCELLED) {
      if (
        booking.status === BookingStatus.CANCELLED ||
        booking.status === BookingStatus.COMPLETED
      ) {
        throw new BadRequestException('Booking cannot be canceled');
      }
    }

    if (body.status === BookingStatus.COMPLETED) {
      if (booking.status !== BookingStatus.CONFIRMED) {
        throw new BadRequestException(
          'Only confirmed bookings can be marked as completed',
        );
      }
    }

    const update =
      body.status === BookingStatus.CANCELLED
        ? {
            status: BookingStatus.CANCELLED,
            cancellationReason: body.cancellationReason,
            cancellationDate: new Date(),
            cancelBy: CancelBy.HOST,
          }
        : { status: body.status };

    const updatedBooking = await this.bookingRepository.findOneAndUpdate(
      { _id: id, host: user._id, status: booking.status },
      { $set: update },
      { runValidators: true },
    );
    if (!updatedBooking) {
      throw new BadRequestException('Booking status changed; reload and retry');
    }

    return plainToInstance(BookingResponseDto, updatedBooking.toObject(), {
      excludeExtraneousValues: true,
    });
  }
}
