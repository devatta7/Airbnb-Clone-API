import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Booking } from '../schema/booking.schema';

@Injectable()
export class BookingRepository extends BaseRepository<Booking> {
  constructor(@InjectModel(ModelNames.BOOKINGS) bookingModel: Model<Booking>) {
    super(bookingModel);
  }
}
