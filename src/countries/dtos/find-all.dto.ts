import { IsOptional, IsString } from 'class-validator';

export class FindAllDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  countryCode: string;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
