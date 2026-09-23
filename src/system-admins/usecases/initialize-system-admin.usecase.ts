import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';

import {
  EnvironmentInterface,
  ISystemAdmin,
} from '../../common/configuration/environment.interface';
import { SystemAdminRepository } from '../repository/system-admin.repository';

@Injectable()
export class InitializeSystemAdminUseCase {
  private readonly logger = new Logger(InitializeSystemAdminUseCase.name);

  constructor(
    private readonly systemAdminRepository: SystemAdminRepository,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(): Promise<void> {
    const { name, email, password } =
      this.configService.getOrThrow<ISystemAdmin>('systemAdmin');

    const existingAdmin = await this.systemAdminRepository.findOne({ email });
    if (existingAdmin) {
      this.logger.log('System admin already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.systemAdminRepository.create({
      name,
      email,
      password: hashedPassword,
      isSuperAdmin: true,
    });

    this.logger.log('System admin initialized successfully.');
  }
}
