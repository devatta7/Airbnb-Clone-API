import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  page: number;

  @IsOptional()
  @ApiPropertyOptional({ example: 10, minimum: 1 })
  limit: number;

  @IsOptional()
  @ApiPropertyOptional({ example: false })
  ignoreLimit: boolean;
}
