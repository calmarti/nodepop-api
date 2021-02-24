import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsController } from './tweets.controller';
import { Tweet } from './tweets.entity';
import { TweetsService } from './tweets.service';

@Module({
  controllers: [TweetsController],
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetsService],
})
export class TweetsModule {}
