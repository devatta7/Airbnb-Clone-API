import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTag } from '../common/swagger/constant';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { BookingsService } from './bookings.service';

@ApiTags(ApiTag.BOOKINGS)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('check-availability')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Check unit availability and calculate booking cost',
  })
  @ApiQuery({ name: 'unit', type: String, required: true })
  @ApiQuery({
    name: 'checkIn',
    type: String,
    required: true,
    example: '2027-01-10T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'checkOut',
    type: String,
    required: true,
    example: '2027-01-14T00:00:00.000Z',
  })
  @ApiQuery({ name: 'adultsCount', type: Number, required: false, example: 2 })
  @ApiQuery({ name: 'kidsCount', type: Number, required: false, example: 0 })
  @ApiOkResponse({ type: AvailabilityResponseDto })
  checkAvailability(
    @Query() body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return this.bookingsService.checkAvailability(body);
  }
}
