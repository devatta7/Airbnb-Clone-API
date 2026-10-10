import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMongoId,
  IsOptional,
  IsString,
  IsBooleanString,
  IsNumberString,
} from 'class-validator';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllUnitsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Modern apartment' })
  title?: string;

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
  @IsNumberString()
  @ApiPropertyOptional({ example: 500, minimum: 0 })
  minCostPerDay?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: 3000, minimum: 0 })
  maxCostPerDay?: string;

  @IsOptional()
  @IsBooleanString()
  @ApiPropertyOptional({ example: true })
  availability?: string;

  @IsOptional()
  @IsBooleanString()
  @ApiPropertyOptional({ example: true })
  isActive?: string;
}
