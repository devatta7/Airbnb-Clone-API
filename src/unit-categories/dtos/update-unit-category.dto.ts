import { IsOptional, IsString } from 'class-validator';

export class UpdateUnitCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
