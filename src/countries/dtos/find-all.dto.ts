import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllDto extends PaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Egypt' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'EG' })
  countryCode: string;
}
