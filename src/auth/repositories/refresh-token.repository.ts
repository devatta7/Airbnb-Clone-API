import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../../common/data-access/base-repository';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { RefreshToken } from '../schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectModel(ModelNames.REFRESH_TOKENS)
    refreshTokenModel: Model<RefreshToken>,
  ) {
    super(refreshTokenModel);
  }
}
