import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';

import { SystemAdminRepository } from '../repository/system-admin.repository';
import { SystemAdmin } from '../schema/system-admin.schema';

@Injectable()
export class FindSystemAdminUseCase {
  constructor(private readonly systemAdminRepository: SystemAdminRepository) {}

  async execute(query: QueryFilter<SystemAdmin>) {
    return this.systemAdminRepository.findOne(query);
  }
}
