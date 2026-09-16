import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  countryCode?: string;
}
