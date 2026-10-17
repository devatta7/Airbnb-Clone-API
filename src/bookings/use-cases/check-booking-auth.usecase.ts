import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepository } from '../repository/booking.repository';

@Injectable()
export class CheckBookingAuthUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(bookingId: string, userId: string): Promise<void> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');

    if (
      booking.guest.toString() !== userId.toString() &&
      booking.host.toString() !== userId.toString()
    )
      throw new ForbiddenException(
        'You are not authorized to access this booking',
      );
  }
}
