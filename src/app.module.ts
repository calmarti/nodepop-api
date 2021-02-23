import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetsModule } from './tweets/tweets.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TweetsModule, TypeOrmModule.forRoot(), AuthModule, UsersModule],
  providers: [UsersService],
})
export class AppModule {}
