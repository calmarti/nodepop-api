/// <reference types="multer" />
/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
import { ConfigService } from '@nestjs/config';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { FilterAdvertDto } from './dto/filter-advert.dto';
export declare class AdvertsController {
    private readonly advertsService;
    private readonly configService;
    constructor(advertsService: AdvertsService, configService: ConfigService);
    getTags(): Promise<import("./enums/tags.enum").Tags[]>;
    create(createAdvertDto: CreateAdvertDto, file: Express.Multer.File, req: Express.Request): Promise<import("./entities/advert.entity").Advert>;
    findAll(query: FilterAdvertDto): Promise<import("./entities/advert.entity").Advert[]>;
    findOne(id: string): Promise<import("./entities/advert.entity").Advert>;
    remove(id: string): Promise<import("./entities/advert.entity").Advert>;
}
