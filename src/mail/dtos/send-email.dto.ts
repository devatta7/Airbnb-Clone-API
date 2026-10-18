import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  to: string;

  @ApiProperty({ example: 'Welcome to Airbnb Clone' })
  @IsString()
  @MinLength(1)
  subject: string;

  @ApiProperty({ example: 'Welcome to Airbnb Clone.' })
  @IsString()
  @MinLength(1)
  text: string;
}
