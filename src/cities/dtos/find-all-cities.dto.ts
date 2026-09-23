import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllCitiesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Cairo' })
  name: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439011' })
  country: string;
}
