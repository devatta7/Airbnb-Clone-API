import { Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';
import { BookingValidationUseCase } from './booking-vaildation.usecase';
import { BookingCalculationUseCase } from './booking-calculation.usecase';

@Injectable()
export class CheckAvailabilityUseCase {
  constructor(
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingCalculationUseCase: BookingCalculationUseCase,
  ) {}

  async execute(body: CheckAvailabilityDto): Promise<AvailabilityResponseDto> {
    await this.bookingValidationUseCase.execute(body);

    const calculation = await this.bookingCalculationUseCase.execute(body);

    return {
      available: true,
      ...calculation,
    };
  }
}
