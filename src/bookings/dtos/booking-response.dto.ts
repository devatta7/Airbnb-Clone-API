import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BookingStatus } from '../enums/booking-status.enum';
import { GuestReviewDto } from './guest-review.dto';

export class BookingResponseDto {
  @ApiProperty({
    description: 'Booking ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'Unit MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @Expose()
  unit: string;

  @ApiProperty({
    description: 'Guest user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @Expose()
  guest: string;

  @ApiProperty({
    description: 'Host user MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @Expose()
  host: string;

  @ApiProperty({
    description: 'Check-in date',
    example: '2026-08-01T00:00:00.000Z',
  })
  @Expose({ name: 'checkInDate' })
  checkIn: number | Date;

  @ApiProperty({
    description: 'Check-out date',
    example: '2026-08-05T00:00:00.000Z',
  })
  @Expose({ name: 'checkOutDate' })
  checkOut: number | Date;

  @ApiPropertyOptional({ description: 'Number of adults', example: 2 })
  @Expose()
  adultsCount?: number;

  @ApiPropertyOptional({ description: 'Number of kids', example: 1 })
  @Expose()
  kidsCount?: number;

  @ApiPropertyOptional({
    description: 'Guest notes',
    example: 'Late check-in requested',
  })
  @Expose()
  notes?: string;

  @ApiProperty({ description: 'Unit price per day', example: 1200 })
  @Expose()
  pricePerDay: number;

  @ApiProperty({ description: 'Number of booked days', example: 4 })
  @Expose()
  daysCount: number;

  @ApiProperty({ description: 'Booking amount before VAT', example: 4800 })
  @Expose()
  bookingAmount: number;

  @ApiProperty({ description: 'VAT rate percentage', example: 14 })
  @Expose()
  vat: number;

  @ApiProperty({ description: 'VAT amount', example: 672 })
  @Expose()
  vatAmount: number;

  @ApiProperty({ description: 'Total amount including VAT', example: 5472 })
  @Expose()
  totalAmount: number;

  @ApiProperty({ description: 'Booking status', enum: BookingStatus })
  @Expose()
  status: BookingStatus;

  @ApiPropertyOptional({
    description: 'Cancellation reason',
    example: 'Travel plans changed',
  })
  @Expose()
  cancellationReason?: string;

  @ApiPropertyOptional({
    description: 'Guest review',
    type: () => GuestReviewDto,
  })
  @Expose()
  guestReview?: GuestReviewDto;
}
