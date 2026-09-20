import { IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
