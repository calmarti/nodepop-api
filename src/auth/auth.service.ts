import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const { password, ...user } = await this.usersService.create({
      ...signupDto,
      password: hashedPassword,
    });
    return user;
  }

  login(user: any) {
    return {
      access_token: this.jwtService.sign({ sub: user.id }),
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
    return this.usersService.findOne(id);
  }

  getMe(id: string) {
    return this.usersService.findOne(id);
  }
}
