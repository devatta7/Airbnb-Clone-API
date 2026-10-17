import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
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
  @Transform(({ value }: TransformFnParams) => {
    const rawValue: unknown = value as unknown;
    if (rawValue === 'true') return true;
    if (rawValue === 'false') return false;
    return rawValue;
  })
  @IsBoolean()
  ignoreLimit: boolean;
}
