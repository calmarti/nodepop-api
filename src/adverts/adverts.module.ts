import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advert } from './entities/advert.entity';

@Module({
  controllers: [AdvertsController],
  imports: [TypeOrmModule.forFeature([Advert])],
  providers: [AdvertsService],
})
export class AdvertsModule {}
