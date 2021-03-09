import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advert } from './entities/advert.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AdvertsController],
  imports: [TypeOrmModule.forFeature([Advert]), ConfigModule],
  providers: [AdvertsService],
})
export class AdvertsModule {}
