import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCityDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Giza' })
  name: string;
}
