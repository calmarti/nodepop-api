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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ResponseOrNotFoundInterceptor } from 'src/response-or-not-found.interceptor';
import { TweetDto } from './dto/tweet.dto';
import { TweetsService } from './tweets.service';

@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @ApiBearerAuth()
  @ApiBody({ type: TweetDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() tweetDto: TweetDto, @Req() req: Request) {
    return this.tweetsService.create({
      ...tweetDto,
      user: req.user,
    });
  }

  @Get()
  getAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ResponseOrNotFoundInterceptor)
  getOne(@Param('id') id: string) {
    return this.tweetsService.findById(id);
  }
}
