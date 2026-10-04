import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UnitResponseDto } from './dtos/unit-response.dto';
import { CurrentUserData } from '../auth/interfaces/principal.interface';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';

@Injectable()
export class UnitsService {
  constructor(private readonly createUnitUseCase: CreateUnitUseCase) {}

  create(
    body: CreateUnitDto,
    currentUser: CurrentUserData,
  ): Promise<UnitResponseDto> {
    return this.createUnitUseCase.execute(body, currentUser);
  }
}
