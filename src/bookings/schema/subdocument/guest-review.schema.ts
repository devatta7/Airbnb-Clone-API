import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GuestReview {
  @Prop({ required: true, type: Number, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true, type: String })
  comment: string;
}

export const GuestReviewSchema = SchemaFactory.createForClass(GuestReview);
