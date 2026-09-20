import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UnitCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  icon?: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const UnitCategorySchema = SchemaFactory.createForClass(UnitCategory);
