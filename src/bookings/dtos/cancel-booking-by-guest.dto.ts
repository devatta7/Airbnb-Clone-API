import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CancelBookingByGuestDto {
  @ApiPropertyOptional({
    description: 'Reason for cancelling the booking',
    example: 'Travel plans changed',
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
