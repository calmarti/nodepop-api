import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { Advert } from './entities/advert.entity';
import { Tags } from './enums/tags.enum';

@Injectable()
export class AdvertsService {
  constructor(
    @InjectRepository(Advert)
    private readonly advertsRepository: Repository<Advert>,
  ) {}

  getTags() {
    return Promise.resolve(Object.values(Tags));
  }

  async create(advert: any) {
    const newAdvert = await this.advertsRepository.save(advert);
    return this.advertsRepository.findOne(newAdvert.id);
  }

  findAll(query: any) {
    const where: any = {};
    if (query.name) {
      where.name = Like(query.name);
    }
    if ([true, false].includes(query.sale)) {
      where.sale = Equal(query.sale);
    }
    if (query.price) {
      if (query.price.length === 1) {
        const [min] = query.price;
        where.price = MoreThanOrEqual(min);
      } else {
        const [min, max] = query.price;
        where.price = Between(min, max);
      }
    }
    if (query.tags) {
      where.tags = Like(`%${query.tags.join('%')}%`);
    }
    return this.advertsRepository.find(where);
  }

  findById(id: string) {
    return this.advertsRepository.findOne(id);
  }

  async remove(id: string) {
    const advert = await this.advertsRepository.findOne(id);
    if (!advert) {
      return null;
    }
    return this.advertsRepository.remove(advert);
  }
}
