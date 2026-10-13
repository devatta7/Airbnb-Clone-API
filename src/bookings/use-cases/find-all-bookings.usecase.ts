import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { FindAllBookingsDto } from '../dtos/find-all-bookings.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repository/booking.repository';
import { Booking } from '../schema/booking.schema';

@Injectable()
export class FindAllBookingsUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(
    query: FindAllBookingsDto,
  ): Promise<PaginatedResult<BookingResponseDto>> {
    const matchQuery: QueryFilter<Booking> = {};
    this.applyFilters(matchQuery, query);

    const result = await this.bookingRepository.findPaginated(matchQuery, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      ignoreLimit: query.ignoreLimit,
      sort: { createdAt: -1 },
      populate: [
        { path: 'unit', select: 'title' },
        { path: 'guest', select: 'name, phoneNumber' },
        { path: 'host', select: 'name' },
      ],
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

  private applyFilters(
    matchQuery: QueryFilter<Booking>,
    query: FindAllBookingsDto,
  ): void {
    if (query.status) matchQuery.status = query.status;
    if (query.unit) matchQuery.unit = query.unit;
    if (query.checkIn) {
      matchQuery.checkOutDate = { $gt: dayjs(query.checkIn).toDate() };
    }
    if (query.checkOut) {
      matchQuery.checkInDate = { $lt: dayjs(query.checkOut).toDate() };
    }
  }
}
