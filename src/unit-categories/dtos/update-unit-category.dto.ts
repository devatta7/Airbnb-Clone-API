import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUnitCategoryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apartment' })
  name?: string;
}
