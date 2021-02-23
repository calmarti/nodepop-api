import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseOrNotFound } from 'src/response-or-not-found.interceptor';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  @ResponseOrNotFound()
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(id);
  }
}
