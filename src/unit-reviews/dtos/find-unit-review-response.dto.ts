import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ReviewGuestDto {
  @Expose()
  @ApiProperty({ example: 'Ahmed' })
  name: string;
}

export class FindUnitReviewResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @Expose()
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  rating: number;

  @Expose()
  @ApiProperty({ example: 'Great stay!' })
  comment: string;

  @Expose()
  @ApiProperty({ example: '2026-10-17T10:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @Type(() => ReviewGuestDto)
  @ApiProperty({ type: ReviewGuestDto })
  guest: ReviewGuestDto;
}
