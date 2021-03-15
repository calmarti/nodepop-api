import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const { password, ...user } = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  login(user: any) {
    return {
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const { password: hash, id } = user;
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      return null;
    }
    return this.usersService.findById(id);
  }
}
