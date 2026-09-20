import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: ModelNames.COUNTRIES })
  country: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const CitySchema = SchemaFactory.createForClass(City);
