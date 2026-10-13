import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateBookingRequestDto {
  @ApiPropertyOptional({
    description: 'Check-in date',
    example: '2026-08-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkIn?: Date;

  @ApiPropertyOptional({
    description: 'Check-out date',
    example: '2026-08-05T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  checkOut?: Date;

  @ApiPropertyOptional({ description: 'Number of adults', example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  adultsCount?: number;

  @ApiPropertyOptional({ description: 'Number of kids', example: 1 })
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
