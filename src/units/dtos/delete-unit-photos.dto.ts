import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUnitPhotosDto {
  @ApiProperty({ type: [String], example: ['https://example.com/photo.jpg'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  photos: string[];
}
