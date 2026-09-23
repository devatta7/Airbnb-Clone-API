import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../../common/constants/roles.constant';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'mahmoud@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Account role used to select the login flow',
    enum: Roles,
    example: Roles.USER,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
