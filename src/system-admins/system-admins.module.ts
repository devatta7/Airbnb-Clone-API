import { Module } from '@nestjs/common';
import { SystemAdminsService } from './system-admins.service';
import { SystemAdminRepository } from './repository/system-admin.repository';
import { ModelNames } from '../common/data-access/model-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemAdminSchema } from './schema/system-admin.schema';
import { InitializeSystemAdminUseCase } from './usecases/initialize-system-admin.usecase';
import { FindSystemAdminUseCase } from './usecases/find-system-admin.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.SYSTEM_ADMINS, schema: SystemAdminSchema },
    ]),
  ],
  providers: [
    SystemAdminsService,
    SystemAdminRepository,
    InitializeSystemAdminUseCase,
    FindSystemAdminUseCase,
  ],
  exports: [SystemAdminsService, FindSystemAdminUseCase],
})
export class SystemAdminsModule {}
