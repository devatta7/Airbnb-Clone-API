import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookingStatus } from '../enums/booking-status.enum';

export class ChangeBookingStatusDto {
  @ApiProperty({
    description: 'New booking status',
    enum: [
      BookingStatus.CONFIRMED,
      BookingStatus.CANCELLED,
      BookingStatus.COMPLETED,
    ],
    example: BookingStatus.CONFIRMED,
  })
  @IsNotEmpty()
  @IsIn([
    BookingStatus.CONFIRMED,
    BookingStatus.CANCELLED,
    BookingStatus.COMPLETED,
  ])
  status: BookingStatus;

  @ApiPropertyOptional({
    description: 'Cancellation reason when cancelling a booking',
    example: 'The requested dates are no longer available',
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
