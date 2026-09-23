import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User Name',
    example: 'Mahmoud Ahmed',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User Email',
    example: 'mahmoud@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Phone Number',
    example: '01012345678',
  })
  @IsMobilePhone('ar-EG')
  phoneNumber: string;

  @ApiProperty({
    description: 'User Password',
    example: '12345678',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
