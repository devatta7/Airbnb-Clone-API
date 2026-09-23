import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @Expose()
  @ApiProperty({ example: 'Mahmoud Ahmed' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'mahmoud@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '01012345678' })
  phoneNumber: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
