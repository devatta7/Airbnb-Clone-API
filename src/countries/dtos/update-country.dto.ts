import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCountryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Egypt' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'EG' })
  countryCode?: string;
}
