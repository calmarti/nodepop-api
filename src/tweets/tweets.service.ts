import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet } from './tweets.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private tweetsRepository: Repository<Tweet>,
  ) {}

  create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return this.tweetsRepository.save(createTweetDto);
  }

  findAll(): Promise<Tweet[]> {
    return this.tweetsRepository.find();
  }

  findOne(id: string): Promise<Tweet> {
    return this.tweetsRepository.findOne(id);
  }
}
