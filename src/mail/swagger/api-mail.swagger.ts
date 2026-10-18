import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SendEmailDto } from '../dtos/send-email.dto';

export function SwaggerSendTestEmail() {
  return applyDecorators(
    ApiOperation({ summary: 'Send a test email' }),
    ApiBearerAuth(),
    ApiBody({ type: SendEmailDto }),
    ApiOkResponse({
      description: 'Test email sent successfully',
      schema: { example: { message: 'Test email sent successfully.' } },
    }),
    ApiBadRequestResponse({ description: 'Invalid email message data' }),
    ApiUnauthorizedResponse({ description: 'Authentication is required' }),
  );
}
