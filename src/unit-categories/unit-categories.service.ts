import { Injectable } from '@nestjs/common';

import { PaginatedResult } from '../common/data-access/base-repository';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { FindAllUnitCategoriesDto } from './dtos/find-all-unit-categories.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { CreateUnitCategoryUseCase } from './use-cases/create-unit-category.usecase';
import { FindAllUnitCategoriesUseCase } from './use-cases/find-all-unit-categories.usecase';
import { FindUnitCategoryByIdUseCase } from './use-cases/find-unit-category-by-id.usecase';
import { SoftDeleteUnitCategoryUseCase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryUseCase } from './use-cases/update-unit-category.usecase';

@Injectable()
export class UnitCategoriesService {
  constructor(
    private readonly createUnitCategoryUseCase: CreateUnitCategoryUseCase,
    private readonly findUnitCategoryByIdUseCase: FindUnitCategoryByIdUseCase,
    private readonly findAllUnitCategoriesUseCase: FindAllUnitCategoriesUseCase,
    private readonly updateUnitCategoryUseCase: UpdateUnitCategoryUseCase,
    private readonly softDeleteUnitCategoryUseCase: SoftDeleteUnitCategoryUseCase,
  ) {}

  create(body: CreateUnitCategoryDto): Promise<UnitCategoryResponseDto> {
    return this.createUnitCategoryUseCase.execute(body);
  }

  findOne(id: string): Promise<UnitCategoryResponseDto> {
    return this.findUnitCategoryByIdUseCase.execute(id);
  }

  findAll(
    query: FindAllUnitCategoriesDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.findAllUnitCategoriesUseCase.execute(query);
  }

  update(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.updateUnitCategoryUseCase.execute(id, body);
  }

  softDelete(id: string): Promise<void> {
    return this.softDeleteUnitCategoryUseCase.execute(id);
  }
}
