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

  findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async delete(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (user) await user.destroy();
    return user;
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    return user ?
      user.update({
        name: userDto.name,
        email: userDto.email,
        password: await bcrypt.hash(userDto.password, 10)
      }) : user;
  }
}
