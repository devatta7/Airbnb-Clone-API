import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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
  @Type(() => Date)
  @IsDate()
  checkIn: Date;

  @ApiProperty({
    description: 'Check-out date',
    example: '2026-08-05T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  checkOut: Date;

  @ApiPropertyOptional({
    description: 'Number of adults (defaults to 1)',
    example: 2,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  adultsCount?: number;

  @ApiPropertyOptional({
    description: 'Number of kids (defaults to 0)',
    example: 1,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  kidsCount?: number;

  @ApiPropertyOptional({
    description: 'Additional guest notes',
    example: 'Late check-in requested',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
