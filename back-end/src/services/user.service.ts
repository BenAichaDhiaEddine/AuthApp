import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { validatePassword } from 'src/utils/validationUtils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async signup(user: User): Promise<User> {
    if (!user.email || !user.password) {
      throw new HttpException(
        'Missing required fields: email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    if (!validatePassword(user.password)) {
      throw new HttpException(
        'Password must be at least 8 characters and contain a letter, number, and special character',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async signin(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
