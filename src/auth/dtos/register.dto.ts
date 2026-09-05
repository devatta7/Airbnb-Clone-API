import { IsEmail, IsMobilePhone, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsMobilePhone('ar-EG')
  phoneNumber: string;

  @IsString()
  @MinLength(6)
  password: string;
}
