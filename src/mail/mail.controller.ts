import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dtos/send-email.dto';
import { MailService } from './mail.service';
import { ApiTag } from '../common/swagger/constant';
import { SwaggerSendTestEmail } from './swagger/api-mail.swagger';

@ApiTags(ApiTag.MAIL)
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @SwaggerSendTestEmail()
  async sendTestEmail(@Body() dto: SendEmailDto): Promise<{ message: string }> {
    await this.mailService.sendEmail(dto);
    return { message: 'Test email sent successfully.' };
  }
}
