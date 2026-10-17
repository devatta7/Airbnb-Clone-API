import { Injectable } from '@nestjs/common';
import { UnitsService } from '../../units/units.service';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { BookingCalculationResponse } from '../dtos/booking-calculation-response.dto';
import dayjs from 'dayjs';

@Injectable()
export class BookingCalculationUseCase {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly appSettingsService: AppSettingsService,
  ) {}

  async execute(
    body: CheckAvailabilityDto,
  ): Promise<BookingCalculationResponse> {
    const daysCount = this.calculateDaysCount(body.checkIn, body.checkOut);

    const [unit, appSettings] = await Promise.all([
      this.unitsService.findOne(body.unit),
      this.appSettingsService.findOne(),
    ]);

    const bookingAmount = this.calculateBookingAmount(
      daysCount,
      unit.costPerDay,
    );

    const vatAmount = this.calculateVatAmount(
      bookingAmount,
      appSettings.vatRate,
    );

    return {
      pricePerDay: unit.costPerDay,
      daysCount,
      bookingAmount,
      vat: appSettings.vatRate,
      vatAmount,
      totalAmount: this.calculateTotalAmount(bookingAmount, vatAmount),
    };
  }

  private calculateDaysCount(checkIn: Date, checkOut: Date): number {
    return dayjs(checkOut).diff(dayjs(checkIn), 'day');
  }

  private calculateBookingAmount(
    daysCount: number,
    costPerDay: number,
  ): number {
    return daysCount * costPerDay;
  }

  private calculateVatAmount(bookingAmount: number, vatRate: number): number {
    return (bookingAmount * vatRate) / 100;
  }

  private calculateTotalAmount(
    bookingAmount: number,
    vatAmount: number,
  ): number {
    return bookingAmount + vatAmount;
  }
}
