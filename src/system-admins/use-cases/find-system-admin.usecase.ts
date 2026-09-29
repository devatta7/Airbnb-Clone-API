import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { SystemAdminRepository } from '../repository/system-admin.repository';
import { SystemAdmin } from '../schema/system-admin.schema';
import { SystemAdminResponseDto } from '../dtos/system-admin-response.dto';

@Injectable()
export class FindSystemAdminUseCase {
  constructor(private readonly systemAdminRepository: SystemAdminRepository) {}

  async execute(
    query: QueryFilter<SystemAdmin>,
  ): Promise<SystemAdminResponseDto | null> {
    const systemAdmin = await this.systemAdminRepository.findOne(query);

    if (!systemAdmin) {
      return null;
    }

    return plainToInstance(SystemAdminResponseDto, systemAdmin.toObject());
  }
}
