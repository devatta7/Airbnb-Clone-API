import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access/model-names.enum';
import { BookingSchema } from './schema/booking.schema';
import { BookingRepository } from './repository/booking.repository';
import { CreateBookingUseCase } from './use-cases/create-booking.usecase';
import { FindAllBookingsUseCase } from './use-cases/find-all-bookings.usecase';
import { FindBookingByIdUseCase } from './use-cases/find-booking-by-id.usecase';
import { UpdateBookingUseCase } from './use-cases/update-booking.usecase';
import { SoftDeleteBookingUseCase } from './use-cases/soft-delete-booking.usecase';
import { CheckAvailabilityUseCase } from './use-cases/check-availbility.usecase';
import { BookingValidationUseCase } from './use-cases/booking-vaildation.usecase';
import { BookingCalculationUseCase } from './use-cases/booking-calculation.usecase';
import { UnitsModule } from '../units/units.module';
import { AppSettingsModule } from '../app-settings/app-settings.module';

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
    CreateBookingUseCase,
    FindAllBookingsUseCase,
    FindBookingByIdUseCase,
    UpdateBookingUseCase,
    SoftDeleteBookingUseCase,
    CheckAvailabilityUseCase,
    BookingValidationUseCase,
    BookingCalculationUseCase,
  ],
  controllers: [BookingsController],
  exports: [BookingRepository, BookingsService],
})
export class BookingsModule {}
