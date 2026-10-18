import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Email address that received the OTP',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Six-digit OTP code', example: '123456' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{6}$/)
  code: string;
}
