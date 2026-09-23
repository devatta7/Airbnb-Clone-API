import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Egypt' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'EG' })
  countryCode: string;
}
