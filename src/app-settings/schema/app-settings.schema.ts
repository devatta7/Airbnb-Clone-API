import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AppSettings {
  @Prop({ required: true, min: 0, max: 25, default: 0 })
  vatRate: number;

  @Prop({ required: true, default: 0 })
  minPrice: number;
}

export const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);
