import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BookingRequestDto {
  @ApiProperty({
    description: 'Unit MongoDB ID',
    example: '60d21b4967d0d8992e610c85',
  })
  @IsMongoId()
  unit: string;

  @ApiProperty({
    description: 'Check-in date',
    example: '2026-08-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  checkIn: number | Date;

  @ApiProperty({
    description: 'Check-out date',
    example: '2026-08-05T00:00:00.000Z',
  })
  @IsNotEmpty()
  checkOut: number | Date;

  @ApiPropertyOptional({ description: 'Number of adults', example: 2 })
  @IsOptional()
  adultsCount?: number;

  @ApiPropertyOptional({ description: 'Number of kids', example: 1 })
  @IsOptional()
  kidsCount?: number;

  @ApiPropertyOptional({
    description: 'Additional guest notes',
    example: 'Late check-in requested',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
