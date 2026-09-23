import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'Mahmoud Ahmed' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'mahmoud@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '01012345678' })
  phoneNumber: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '12345678', minLength: 6 })
  password: string;
}
