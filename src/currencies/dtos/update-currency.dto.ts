import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCurrencyDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Egyptian Pound' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'EGP' })
  currencyCode?: string;
}
