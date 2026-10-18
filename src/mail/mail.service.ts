import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_ADAPTER } from './constants/email-adapter.constant';
import { SendEmailDto } from './dtos/send-email.dto';
import type { EmailAdapterInterface } from './interfaces/email-adapter.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(EMAIL_ADAPTER)
    private readonly emailAdapter: EmailAdapterInterface,
  ) {}

  async sendEmail(dto: SendEmailDto): Promise<void> {
    await this.emailAdapter.sendEmail(dto);
  }
}
