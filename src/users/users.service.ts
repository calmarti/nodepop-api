import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  create(user: User) {
    return this.usersRepository.save(user);
  }

  findById(id: string) {
    return this.usersRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['password', 'id'],
    });
  }
}
