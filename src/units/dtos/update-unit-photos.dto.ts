import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class UpdateUnitPhotosDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  photos: string[];
}
