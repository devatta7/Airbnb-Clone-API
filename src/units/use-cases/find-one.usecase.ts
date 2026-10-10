import { Injectable, NotFoundException } from '@nestjs/common';

import { UnitRepository } from '../repository/unit.repository';
import { QueryFilter } from 'mongoose';
import { Unit } from '../schema/unit.schema';
import { plainToInstance } from 'class-transformer';
import { UnitResponseDto } from '../dtos/unit-response.dto';

@Injectable()
export class FindOneUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(query: QueryFilter<Unit>) {
    const unit = await this.unitRepository.findOne(query);
    if (!unit) {
      throw new NotFoundException('Unit not found');
    }
    return plainToInstance(UnitResponseDto, unit.toObject());
  }
}
