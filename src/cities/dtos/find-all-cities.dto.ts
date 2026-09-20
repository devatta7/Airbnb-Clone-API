import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/data-access/dto/pagination.dto';

export class FindAllCitiesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsMongoId()
  @IsOptional()
  country: string;
}
