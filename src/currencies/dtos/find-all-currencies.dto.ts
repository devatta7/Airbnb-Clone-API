import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllCurrenciesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Egyptian Pound' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'EGP' })
  currencyCode?: string;
}
