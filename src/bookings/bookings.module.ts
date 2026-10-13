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
import { FindBookingByIdUseCase } from './use-cases/find-booking-by-id.usecase';
import { CheckBookingAuthUseCase } from './use-cases/check-booking-auth.usecase';
import { UpdateBookingByGuestUseCase } from './use-cases/update-booking-by-guest.usecase';
import { CancelBookingByGuestUseCase } from './use-cases/cancel-booking-by-guest.usecase';
import { ChangeBookingStatusByHostUseCase } from './use-cases/change-booking-status-by-host.usecase';

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
    FindBookingByIdUseCase,
    CheckBookingAuthUseCase,
    UpdateBookingByGuestUseCase,
    CancelBookingByGuestUseCase,
    ChangeBookingStatusByHostUseCase,
  ],
  controllers: [BookingsController],
  exports: [BookingRepository, BookingsService],
})
export class BookingsModule {}
