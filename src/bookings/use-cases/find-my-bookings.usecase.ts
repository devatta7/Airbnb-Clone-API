import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { FindAllBookingsDto } from '../dtos/find-all-bookings.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repository/booking.repository';
import { Booking } from '../schema/booking.schema';
import { BookingUserType } from '../enums/booking-user-type.enum';

@Injectable()
export class FindMyBookingsUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(
    query: FindAllBookingsDto,
    currentUser: CurrentUserData,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    const userType = query.userType ?? BookingUserType.GUEST;
    const matchQuery: QueryFilter<Booking> = {
      [userType]: currentUser._id,
    };

    if (query.status) matchQuery.status = query.status;
    if (query.unit) matchQuery.unit = query.unit;
    if (query.checkIn) {
      matchQuery.checkOutDate = { $gt: dayjs(query.checkIn).toDate() };
    }
    if (query.checkOut) {
      matchQuery.checkInDate = { $lt: dayjs(query.checkOut).toDate() };
    }

    const result = await this.bookingRepository.findPaginated(matchQuery, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      ignoreLimit: query.ignoreLimit,
      sort: { createdAt: -1 },
    });

    const data = plainToInstance(
      BookingResponseDto,
      result.data.map((booking) => booking.toObject()),
    );

    return new PaginatedResult(
      data,
      result.totalCount,
      result.page,
      result.limit,
    );
  }
}
