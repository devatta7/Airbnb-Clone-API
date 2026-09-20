import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  countryCode: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
