import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserDto } from './model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  create(user: UserDto): Promise<User> {
    return this.userModel.create({
      firstName: user.firstName,
      lastName: user.lastName
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
    return user ? user.destroy() : null;
  }

  async update(id: number, user: UserDto): Promise<User> {
    const oldUser = await this.userModel.findByPk(id);
    return oldUser ?
      oldUser.update({
        firstName: user.firstName,
        lastName: user.lastName
      }) : null;
  }
}
