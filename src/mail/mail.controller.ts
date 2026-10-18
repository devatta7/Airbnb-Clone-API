import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SendEmailDto } from './dtos/send-email.dto';
import { MailService } from './mail.service';

@ApiTags('Mail')
@ApiBearerAuth()
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a test email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Test email sent successfully.',
  })
  async sendTestEmail(@Body() dto: SendEmailDto): Promise<{ message: string }> {
    await this.mailService.sendEmail(dto);
    return { message: 'Test email sent successfully.' };
  }
}
