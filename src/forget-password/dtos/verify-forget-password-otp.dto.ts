import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyForgetPasswordOtpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Six-digit OTP code' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{6}$/)
  code: string;
}
