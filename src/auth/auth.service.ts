import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto, JwtTokenDto } from './model';
import { UsersService } from '../users/users.service';
import { User } from '../users/model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(authDto: AuthDto): Promise<JwtTokenDto> {
    const user = await this.usersService.findOne(authDto.email);
    if (user && await bcrypt.compare(authDto.password, user.password)) {
      const payload = { email: user.email, pass: user.password };
      return { access_token: this.jwtService.sign(payload) };
    }
    return null;
  }
}