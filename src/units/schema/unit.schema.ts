import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], required: true })
  photos: string[];

  @Prop({ required: true, min: 1 })
  costPerDay: number;

  @Prop({ required: true, ref: ModelNames.COUNTRIES })
  country: string;

  @Prop({ required: true, ref: ModelNames.CITIES })
  city: string;

  @Prop({ required: true, ref: ModelNames.UNIT_CATEGORIES })
  unitCategory: string;

  @Prop({ required: true, ref: ModelNames.USERS })
  user: string;

  @Prop({ required: true })
  roomsCount: number;

  @Prop({ required: true })
  adultsCount: number;

  @Prop({ required: true })
  kidsCount: number;

  @Prop({ required: true, default: false })
  hasInternetService: boolean;

  @Prop({ required: true, default: false })
  hasKitchen: boolean;

  @Prop({ required: true, default: false })
  hasPrivateGarage: boolean;

  @Prop({ required: true, default: true })
  availability: boolean;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
