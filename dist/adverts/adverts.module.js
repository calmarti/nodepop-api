"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertsModule = void 0;
const common_1 = require("@nestjs/common");
const adverts_service_1 = require("./adverts.service");
const adverts_controller_1 = require("./adverts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const advert_entity_1 = require("./entities/advert.entity");
const config_1 = require("@nestjs/config");
let AdvertsModule = class AdvertsModule {
};
AdvertsModule = __decorate([
    common_1.Module({
        controllers: [adverts_controller_1.AdvertsController],
        imports: [typeorm_1.TypeOrmModule.forFeature([advert_entity_1.Advert]), config_1.ConfigModule],
        providers: [adverts_service_1.AdvertsService],
    })
], AdvertsModule);
exports.AdvertsModule = AdvertsModule;
//# sourceMappingURL=adverts.module.js.map