import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  EnvironmentInterface,
  ISmtp,
} from '../../common/configuration/environment.interface';
import { SendEmailDto } from '../dtos/send-email.dto';
import { EmailAdapterInterface } from '../interfaces/email-adapter.interface';
import { createEmailHtml } from '../templates/email-template';

@Injectable()
export class NodemailerEmailAdapter implements EmailAdapterInterface {
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;

  constructor(configService: ConfigService<EnvironmentInterface>) {
    const smtp = configService.getOrThrow<ISmtp>('smtp');
    this.from = 'support@airbnb.com';
    this.transporter = nodemailer.createTransport(smtp);
  }

  async sendEmail(dto: SendEmailDto): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      html: createEmailHtml(dto),
    });
  }
}
