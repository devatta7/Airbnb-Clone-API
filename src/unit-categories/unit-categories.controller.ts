import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

import { PaginatedResult } from '../common/data-access/base-repository';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { UnitCategoriesService } from './unit-categories.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from '../common/swagger/constant';
import {
  SwaggerCreateUnitCategory,
  SwaggerDeleteUnitCategory,
  SwaggerFindAllUnitCategories,
  SwaggerFindUnitCategory,
  SwaggerUpdateUnitCategory,
} from './swagger/api-unit-categories.swagger';

@ApiTags(ApiTag.UNIT_CATEGORIES)
@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(private readonly service: UnitCategoriesService) {}

  @Post()
  @SwaggerCreateUnitCategory()
  create(
    @Body() body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.service.create(body);
  }

  @Get()
  @SwaggerFindAllUnitCategories()
  findAll(
    @Query() query: FindAllUnitCategoriesDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.service.findAll(query);
  }

  @Get(':id')
  @SwaggerFindUnitCategory()
  findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<UnitCategoryResponseDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @SwaggerUpdateUnitCategory()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @SwaggerDeleteUnitCategory()
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.service.softDelete(id);
  }
}
