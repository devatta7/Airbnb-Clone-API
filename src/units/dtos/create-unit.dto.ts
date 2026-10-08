import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty({ example: 'Modern apartment in downtown' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'A comfortable apartment close to city attractions.',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12 Nile Street, Cairo' })
  address: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    example: ['photo.jpg'],
  })
  photos?: string[];

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1200, minimum: 1 })
  costPerDay: number;

  @IsMongoId()
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  country: string;

  @IsMongoId()
  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  city: string;

  @IsMongoId()
  @ApiProperty({ example: '507f1f77bcf86cd799439013' })
  unitCategory: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 2, minimum: 1 })
  roomsCount: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 4, minimum: 1 })
  adultsCount: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 1, minimum: 0 })
  kidsCount: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  hasInternetService?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  hasKitchen?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  hasPrivateGarage?: boolean;
}
