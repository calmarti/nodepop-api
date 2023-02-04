"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const advert_entity_1 = require("./entities/advert.entity");
const tags_enum_1 = require("./enums/tags.enum");
let AdvertsService = class AdvertsService {
    constructor(advertsRepository) {
        this.advertsRepository = advertsRepository;
    }
    getTags() {
        return Promise.resolve(Object.values(tags_enum_1.Tags));
    }
    async create(advert) {
        const newAdvert = await this.advertsRepository.save(advert);
        return this.advertsRepository.findOne(newAdvert.id);
    }
    findAll(query) {
        const where = {};
        if (query.name) {
            where.name = typeorm_2.Like(query.name);
        }
        if ([true, false].includes(query.sale)) {
            where.sale = typeorm_2.Equal(query.sale);
        }
        if (query.price) {
            if (query.price.length === 1) {
                const [min] = query.price;
                where.price = typeorm_2.MoreThanOrEqual(min);
            }
            else {
                const [min, max] = query.price;
                where.price = typeorm_2.Between(min, max);
            }
        }
        if (query.tags) {
            where.tags = typeorm_2.Like(`%${query.tags.join('%')}%`);
        }
        return this.advertsRepository.find(where);
    }
    findById(id) {
        return this.advertsRepository.findOne(id);
    }
    async remove(id) {
        const advert = await this.advertsRepository.findOne(id);
        if (!advert) {
            return null;
        }
        return this.advertsRepository.remove(advert);
    }
};
AdvertsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(advert_entity_1.Advert)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdvertsService);
exports.AdvertsService = AdvertsService;
//# sourceMappingURL=adverts.service.js.map