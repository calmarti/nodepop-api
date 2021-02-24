import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweets.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetsRepository: Repository<Tweet>,
  ) {}

  create(tweet: any) {
    return this.tweetsRepository.save(tweet);
  }

  findAll() {
    return this.tweetsRepository.find();
  }

  findOne(id: string) {
    return this.tweetsRepository.findOne(id);
  }
}
