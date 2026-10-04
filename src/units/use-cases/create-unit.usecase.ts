import { Injectable } from '@nestjs/common';
import { UnitRepository } from '../repository/unit.repository';
import { UnitValidationUseCase } from './unit-validation.usecase';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly unitRepository: UnitRepository,
    private readonly unitValidationUseCase: UnitValidationUseCase,
  ) {}

  async execute(
    body: CreateUnitDto,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    await this.unitValidationUseCase.execute(body);
    const unit = await this.unitRepository.create({
      ...body,
      user: currentUser._id,
    });
    return plainToInstance(UnitResponseDto, unit.toObject());
  }
}
