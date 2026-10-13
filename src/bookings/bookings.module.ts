import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { BookingSchema } from './schema/booking.schema';
import { BookingRepository } from './repository/booking.repository';
import { CheckAvailabilityUseCase } from './use-cases/check-availbility.usecase';
import { BookingValidationUseCase } from './use-cases/booking-vaildation.usecase';
import { BookingCalculationUseCase } from './use-cases/booking-calculation.usecase';
import { BookingRequestUseCase } from './use-cases/booking-request.usecase';
import { UnitsModule } from '../units/units.module';
import { AppSettingsModule } from '../app-settings/app-settings.module';
import { FindAllBookingsUseCase } from './use-cases/find-all-bookings.usecase';
import { FindMyBookingsUseCase } from './use-cases/find-my-bookings.usecase';

@Module({
  imports: [
    UnitsModule,
    AppSettingsModule,
    MongooseModule.forFeature([
      { name: ModelNames.BOOKINGS, schema: BookingSchema },
    ]),
  ],
  providers: [
    BookingsService,
    BookingRepository,
    CheckAvailabilityUseCase,
    BookingRequestUseCase,
    BookingValidationUseCase,
    BookingCalculationUseCase,
    FindAllBookingsUseCase,
    FindMyBookingsUseCase,
  ],
  controllers: [BookingsController],
  exports: [BookingRepository, BookingsService],
})
export class BookingsModule {}
