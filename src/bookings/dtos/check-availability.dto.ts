import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsMongoId,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CheckAvailabilityDto {
  @ApiProperty({
    description: 'Unit MongoDB ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({
    description: 'Check-in date',
    example: '2026-12-20T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  checkIn: Date;

  @ApiProperty({
    description: 'Check-out date',
    example: '2026-12-24T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  checkOut: Date;

  @ApiPropertyOptional({
    description: 'Number of adults',
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
    description: 'Number of kids',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  kidsCount?: number;
}
