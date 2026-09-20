import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllCurrenciesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
