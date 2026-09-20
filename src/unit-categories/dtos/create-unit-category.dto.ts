import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
