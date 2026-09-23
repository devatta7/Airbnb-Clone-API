import { Injectable, OnModuleInit } from '@nestjs/common';
import { QueryFilter } from 'mongoose';

import { InitializeSystemAdminUseCase } from './usecases/initialize-system-admin.usecase';
import { FindSystemAdminUseCase } from './usecases/find-system-admin.usecase';
import { SystemAdmin } from './schema/system-admin.schema';

@Injectable()
export class SystemAdminsService implements OnModuleInit {
  constructor(
    private readonly initializeSystemAdminUseCase: InitializeSystemAdminUseCase,
    private readonly findSystemAdminUseCase: FindSystemAdminUseCase,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.initializeSystemAdminUseCase.execute();
  }

  async findOne(query: QueryFilter<SystemAdmin>) {
    return this.findSystemAdminUseCase.execute(query);
  }
}
