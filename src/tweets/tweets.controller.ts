import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  async create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @Get()
  async findAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tweet = await this.tweetsService.findOne(id);
    if (!tweet) {
      throw new NotFoundException();
    }
    return tweet;
  }
}
