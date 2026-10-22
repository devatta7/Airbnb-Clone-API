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
import { Public } from '../auth/decorators/public.decorator';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../auth/roles/roles.constant';
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
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @Post()
  @RolesAllowed(Roles.systemAdmin)
  @SwaggerCreateUnitCategory()
  create(
    @Body() body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.create(body);
  }

  @Get()
  @Public()
  @SwaggerFindAllUnitCategories()
  findAll(
    @Query() query: FindAllUnitCategoriesDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.unitCategoriesService.findAll(query);
  }

  @Get(':id')
  @Public()
  @SwaggerFindUnitCategory()
  findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.findOne(id);
  }

  @Patch(':id')
  @RolesAllowed(Roles.systemAdmin)
  @SwaggerUpdateUnitCategory()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.update(id, body);
  }

  @Delete(':id')
  @RolesAllowed(Roles.systemAdmin)
  @SwaggerDeleteUnitCategory()
  @HttpCode(HttpStatus.NO_CONTENT)
  softDelete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this.unitCategoriesService.softDelete(id);
  }
}
