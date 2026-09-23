import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Egyptian Pound' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'EGP' })
  currencyCode: string;
}
