import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';

@Schema({ timestamps: true })
export class UnitReview {
  @Prop({ required: true, ref: ModelNames.UNITS, index: true })
  unit: string;

  @Prop({ required: true, ref: ModelNames.BOOKINGS, unique: true })
  booking: string;

  @Prop({ required: true, ref: ModelNames.USERS })
  guest: string;

  @Prop({ required: true, type: Number, min: 1, max: 5 })
  rating: number;

  @Prop({ type: String, trim: true, default: '' })
  comment?: string;
}

export const UnitReviewSchema = SchemaFactory.createForClass(UnitReview);
