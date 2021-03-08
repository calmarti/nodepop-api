import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    console.log(query);
    return this.advertsRepository.find();
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
