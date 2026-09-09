import { ConflictException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async execute(body: CreateUserDto) {
    const { email, phoneNumber } = body;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      throw new ConflictException('Email or phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

    return user;
  }
}
