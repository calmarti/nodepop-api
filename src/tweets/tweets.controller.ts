import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ResponseOrNotFoundInterceptor } from 'src/response-or-not-found.interceptor';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTweetDto: CreateTweetDto, @Req() req: Request) {
    return this.tweetsService.create({
      ...createTweetDto,
      user: req.user,
    });
  }

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ResponseOrNotFoundInterceptor)
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(id);
  }
}
