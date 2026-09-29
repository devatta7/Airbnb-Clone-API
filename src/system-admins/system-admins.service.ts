import { Injectable, OnModuleInit } from '@nestjs/common';

import { QueryFilter } from 'mongoose';

import { InitializeSystemAdminUseCase } from './use-cases/initialize-system-admin.usecase';
import { FindSystemAdminUseCase } from './use-cases/find-system-admin.usecase';

import { SystemAdmin } from './schema/system-admin.schema';
import { SystemAdminResponseDto } from './dtos/system-admin-response.dto';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
  constructor(
    private readonly initializeSystemAdminUseCase: InitializeSystemAdminUseCase,
    private readonly findSystemAdminUseCase: FindSystemAdminUseCase,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.initializeSystemAdminUseCase.execute();
  }

  async findOne(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminResponseDto | null> {
    return this.findSystemAdminUseCase.execute(query);
  }
}
