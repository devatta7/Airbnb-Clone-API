import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UnitCategoryRepository } from '../repository/unit-category.repository';

@Injectable()
export class CreateUnitCategoryUseCase {
  constructor(private readonly repository: UnitCategoryRepository) {}

  async execute(body: CreateUnitCategoryDto): Promise<UnitCategoryResponseDto> {
    const existingCategory = await this.repository.findOne({
      name: body.name,
      isDeleted: false,
    });

    if (existingCategory) {
      throw new ConflictException(
        'Unit category with this name already exists',
      );
    }

    const category = await this.repository.create(body);

    return plainToInstance(UnitCategoryResponseDto, category.toObject());
  }
}
