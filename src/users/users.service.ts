import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserDto) {
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
