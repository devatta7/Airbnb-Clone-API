import { Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityUseCase } from './use-cases/check-availbility.usecase';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
  ) {}

  checkAvailability(
    body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return this.checkAvailabilityUseCase.execute(body);
  }
}
