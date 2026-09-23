import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { UnitCategoryRepository } from '../repository/unit-category.repository';

@Injectable()
export class UpdateUnitCategoryUseCase {
  constructor(private readonly repository: UnitCategoryRepository) {}

  async execute(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    if (body.name) {
      const existingCategory = await this.repository.findOne({
        _id: { $ne: id },
        name: body.name,
        isDeleted: false,
      });

      if (existingCategory) {
        throw new ConflictException(
          'Unit category with this name already exists',
        );
      }
    }

    const category = await this.repository.findOneAndUpdate(
      { _id: id, isDeleted: false },
      body,
      { runValidators: true },
    );

    if (!category) {
      throw new NotFoundException('Unit category not found');
    }

    return plainToInstance(UnitCategoryResponseDto, category.toObject());
  }
}
