import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UsersModule } from '../users/users.module';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { ForgetPasswordRepository } from './repository/forget-password.repository';
import { ForgetPasswordSchema } from './schema/forget-password.schema';
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase';
import { SendForgetPasswordOtpUseCase } from './use-cases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUseCase } from './use-cases/verify-forget-password-otp.usecase';

@Module({
  imports: [
    UsersModule,
    MailModule,
    MongooseModule.forFeature([
      { name: ModelNames.FORGET_PASSWORDS, schema: ForgetPasswordSchema },
    ]),
  ],
  controllers: [ForgetPasswordController],
  providers: [
    ForgetPasswordService,
    ForgetPasswordRepository,
    SendForgetPasswordOtpUseCase,
    VerifyForgetPasswordOtpUseCase,
    ResetPasswordUseCase,
  ],
  exports: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
