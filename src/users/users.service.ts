import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserDto } from './model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(user: UserDto): Promise<User> {
    return this.userModel.create({
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10)
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(email: string): Promise<User> {
    return this.userModel.findByPk(email);
  }

  async delete(email: string): Promise<User> {
    const user = await this.userModel.findByPk(email);
    if (user) await user.destroy();
    return user;
  }

  async update(email: string, userDto: UserDto): Promise<User> {
    const user = await this.userModel.findByPk(email);
    return user ?
      user.update({
        name: userDto.name,
        email: userDto.email,
        password: await bcrypt.hash(userDto.password, 10)
      }) : user;
  }
}
