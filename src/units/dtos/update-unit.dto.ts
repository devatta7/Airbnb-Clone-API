import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUnitDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @ApiPropertyOptional({ example: 'Modern apartment in downtown' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'A comfortable apartment close to city attractions.',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '12 Nile Street, Cairo' })
  address?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ example: 1200, minimum: 1 })
  costPerDay?: number;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439011' })
  country?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439012' })
  city?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439013' })
  unitCategory?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ example: 2, minimum: 1 })
  roomsCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({ example: 4, minimum: 1 })
  adultsCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({ example: 1, minimum: 0 })
  kidsCount?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  hasInternetService?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  hasKitchen?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  hasPrivateGarage?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: true })
  availability?: boolean;
}
