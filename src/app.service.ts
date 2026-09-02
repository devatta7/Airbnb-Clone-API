import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { EnvironmentInterface } from 'common/configuration/environment.interface';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<EnvironmentInterface>) {}

  getHello(): string {
    console.log('PORT', this.configService.getOrThrow('port'));

    return 'Hello World!';
  }

  createUser(data: unknown) {
    return {
      message: 'User Created Successfully',
      user: data,
    };
  }
}
