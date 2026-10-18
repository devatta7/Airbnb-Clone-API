import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Connection } from 'mongoose';
import { GuestReviewDto } from '../dtos/guest-review.dto';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { UnitReviewsService } from '../../unit-reviews/unit-reviews.service';
import { UnitRepository } from '../../units/repository/unit.repository';
import { FindBookingByIdUseCase } from './find-booking-by-id.usecase';
import { Roles } from '../../auth/roles/roles.constant';
import { BookingRepository } from '../repository/booking.repository';

@Injectable()
export class ReviewBookingUseCase {
  constructor(
    private readonly findBookingByIdUseCase: FindBookingByIdUseCase,
    private readonly bookingRepository: BookingRepository,
    private readonly unitRepository: UnitRepository,
    private readonly unitReviewsService: UnitReviewsService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async execute(
    id: string,
    body: GuestReviewDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const booking = await this.findBookingByIdUseCase.execute(id, {
      user,
      role: Roles.USER,
    });
    const guestId = String(
      typeof booking.guest === 'string' ? booking.guest : booking.guest._id,
    );
    if (guestId !== String(user._id)) {
      throw new ForbiddenException('Only the booking guest can review it');
    }
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException('Only completed bookings can be reviewed');
    }
    if (booking.guestReview) {
      throw new BadRequestException('This booking has already been reviewed');
    }

    const session = await this.connection.startSession();
    let updatedBooking;
    try {
      await session.withTransaction(async () => {
        // Conditional update makes duplicate concurrent reviews fail safely.
        updatedBooking = await this.bookingRepository.findOneAndUpdate(
          {
            _id: id,
            guest: user._id,
            status: BookingStatus.COMPLETED,
            guestReview: { $exists: false },
          },
          {
            $set: {
              guestReview: { rating: body.rating, comment: body.comment ?? '' },
            },
          },
          { session, runValidators: true },
        );
        if (!updatedBooking) {
          throw new BadRequestException(
            'Booking was reviewed or changed; reload and retry',
          );
        }

        const unitId = String(
          typeof booking.unit === 'string' ? booking.unit : booking.unit._id,
        );
        await this.unitReviewsService.createUnitReview(
          {
            unit: unitId,
            booking: String(booking._id),
            guest: guestId,
            rating: body.rating,
            comment: body.comment ?? '',
          },
          session,
        );

        const unit = await this.unitRepository.findById(unitId, {
          session,
        });
        if (!unit) throw new NotFoundException('Unit not found');

        const { ratingCount, ratingAvg } =
          await this.unitReviewsService.calculateRatingAvg(unitId, session);
        const result = await this.unitRepository.findOneAndUpdate(
          { _id: unitId },
          {
            $set: {
              reviewsCount: ratingCount,
              averageRating: Math.round(ratingAvg * 100) / 100,
            },
          },
          { session, runValidators: true },
        );
        if (!result) throw new NotFoundException('Unit not found');
      });
    } finally {
      await session.endSession();
    }

    // Mongoose documents contain internal references that class-transformer
    // can recurse through. Convert to a plain object before building the DTO.
    return plainToInstance(BookingResponseDto, updatedBooking.toObject());
  }
}
