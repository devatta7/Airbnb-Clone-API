import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UsersModule } from '../users/users.module';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { OtpRepository } from './repository/otp.repository';
import { OtpSchema } from './schema/otp.schema';
import { FindOtpRawUseCase } from './use-cases/find-otp-raw.usecase';
import { SendOtpUseCase } from './use-cases/send-otp.usecase';
import { VerifyOtpUseCase } from './use-cases/verify-otp.usecase';

@Module({
  imports: [
    UsersModule,
    MailModule,
    MongooseModule.forFeature([{ name: ModelNames.OTPS, schema: OtpSchema }]),
  ],
  controllers: [OtpController],
  providers: [
    OtpService,
    OtpRepository,
    FindOtpRawUseCase,
    SendOtpUseCase,
    VerifyOtpUseCase,
  ],
  exports: [OtpService],
})
export class OtpModule {}
