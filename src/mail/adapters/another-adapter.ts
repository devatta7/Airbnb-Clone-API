import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dtos/send-email.dto';
import { EmailAdapterInterface } from '../interfaces/email-adapter.interface';

@Injectable()
export class AnotherAdapter implements EmailAdapterInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendEmail(_dto: SendEmailDto): Promise<void> {
    throw new Error(
      'AnotherAdapter is a placeholder; configure a real provider before using it.',
    );
  }
}
