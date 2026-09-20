import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllUnitCategoriesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;
}
