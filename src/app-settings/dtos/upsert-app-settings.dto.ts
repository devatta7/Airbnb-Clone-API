import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpsertAppSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(25)
  vatRate: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice: number;
}
