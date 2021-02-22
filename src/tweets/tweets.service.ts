import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweets.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private userRepository: Repository<Tweet>,
  ) {}

  create(createTweetDto: CreateTweetDto) {
    return this.userRepository.save(createTweetDto);
  }

  findAll(): Promise<Tweet[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<Tweet> {
    return this.userRepository.findOne(id);
  }
}
