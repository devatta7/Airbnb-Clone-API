import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
  @Expose()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Egyptian Pound' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'EGP' })
  currencyCode: string;

  @Exclude()
  __v: number;

  @Exclude()
  isDeleted: boolean;
}
