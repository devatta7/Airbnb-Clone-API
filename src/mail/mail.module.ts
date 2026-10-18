import { Module } from '@nestjs/common';
import { EMAIL_ADAPTER } from './constants/email-adapter.constant';
import { NodemailerEmailAdapter } from './adapters/nodemailer-email.adapter';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  controllers: [MailController],
  providers: [
    MailService,
    NodemailerEmailAdapter,
    { provide: EMAIL_ADAPTER, useExisting: NodemailerEmailAdapter },
  ],
  exports: [MailService],
})
export class MailModule {}
