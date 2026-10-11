import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { BookingStatus } from '../enums/booking-status.enum';
import {
  GuestReview,
  GuestReviewSchema,
} from './subdocument/guest-review.schema';

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, ref: ModelNames.UNITS })
  unit: string;

  @Prop({ required: true, ref: ModelNames.USERS })
  guest: string;

  @Prop({ required: true, ref: ModelNames.USERS })
  host: string;

  @Prop({ required: true, type: Date })
  checkInDate: Date;

  @Prop({ required: true, type: Date })
  checkOutDate: Date;

  @Prop({ required: true, type: Number })
  daysCount: number;

  @Prop({ required: true, type: Number })
  pricePerDay: number;

  @Prop({ required: true, type: Number })
  vatAmount: number;

  @Prop({ required: true, type: Number })
  bookingAmount: number;

  @Prop({ required: true, type: Number })
  vat: number;

  @Prop({ type: Number })
  adultsCount: number;

  @Prop({ type: Number })
  kidsCount: number;

  @Prop({ type: String })
  notes: string;

  @Prop({ required: true, type: Number })
  totalAmount: number;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(BookingStatus),
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Prop({ type: String })
  cancellationReason?: string;

  @Prop({ type: GuestReviewSchema })
  guestReview?: GuestReview;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
