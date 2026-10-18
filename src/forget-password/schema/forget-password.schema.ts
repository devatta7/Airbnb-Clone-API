import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ForgetPassword {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ required: true, default: false })
  isVerified: boolean;
}

export const ForgetPasswordSchema =
  SchemaFactory.createForClass(ForgetPassword);
ForgetPasswordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
