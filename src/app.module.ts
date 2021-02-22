import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [TweetsModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
