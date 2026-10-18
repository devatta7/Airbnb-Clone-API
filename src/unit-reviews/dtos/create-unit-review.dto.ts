import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUnitReviewDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  @IsMongoId()
  booking: string;
  @ApiProperty({ example: '507f1f77bcf86cd799439012' })
  @IsMongoId()
  unit: string;
  @ApiProperty({ example: '507f1f77bcf86cd799439013' })
  @IsMongoId()
  guest: string;
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
  @ApiPropertyOptional({ example: 'Great stay!' })
  @IsOptional()
  @IsString()
  comment?: string;
}
