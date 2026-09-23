import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllUnitCategoriesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apartment' })
  name?: string;
}
