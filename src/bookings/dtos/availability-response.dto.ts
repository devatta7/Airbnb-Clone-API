import { ApiProperty } from '@nestjs/swagger';
import { BookingCalculationResponse } from './booking-calculation-response.dto';

export class AvailabilityResponseDto extends BookingCalculationResponse {
  @ApiProperty({ description: 'Whether the unit is available', example: true })
  available: boolean;
}
