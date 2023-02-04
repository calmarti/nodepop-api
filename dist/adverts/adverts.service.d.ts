import { Repository } from 'typeorm';
import { Advert } from './entities/advert.entity';
import { Tags } from './enums/tags.enum';
export declare class AdvertsService {
    private readonly advertsRepository;
    constructor(advertsRepository: Repository<Advert>);
    getTags(): Promise<Tags[]>;
    create(advert: any): Promise<Advert>;
    findAll(query: any): Promise<Advert[]>;
    findById(id: string): Promise<Advert>;
    remove(id: string): Promise<Advert>;
}
