import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpsertAppSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(25)
  @ApiPropertyOptional({ example: 14, minimum: 0, maximum: 25 })
  vatRate: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({ example: 100, minimum: 0 })
  minPrice: number;
}
