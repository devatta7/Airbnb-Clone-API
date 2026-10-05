import { Injectable, NotFoundException } from '@nestjs/common';

import { CurrentUserData } from '../../auth/interfaces/principal.interface';

import { UpdateUnitDto } from '../dtos/update-unit.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';

import { UnitRepository } from '../repository/unit.repository';

import { CheckUnitAuthUseCase } from './check-unit-auth.usecase';
import { FindOneUseCase } from './find-one.usecase';
import { UnitValidationUseCase } from './unit-validation.usecase';

import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly unitValidationUseCase: UnitValidationUseCase,
    private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    private readonly findOneUseCase: FindOneUseCase,
  ) {}

  async execute(
    id: string,
    updateUnitDto: UpdateUnitDto,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    const unit = await this.findOneUseCase.execute({
      _id: id,
      isDeleted: { $ne: true },
    });

    this.checkUnitAuthUseCase.execute(unit.user, currentUser._id);

    await this.unitValidationUseCase.execute(updateUnitDto);

    const updatedUnit = await this.unitRepository.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      updateUnitDto,
      { runValidators: true },
    );

    if (!updatedUnit) {
      throw new NotFoundException('Unit not found');
    }

    return plainToInstance(UnitResponseDto, updatedUnit.toObject());
  }
}
