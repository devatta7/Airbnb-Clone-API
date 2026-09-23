import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Currency {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  currencyCode: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
