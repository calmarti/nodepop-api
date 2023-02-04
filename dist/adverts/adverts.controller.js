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
exports.AdvertsController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/jwt.guard");
const response_or_not_found_interceptor_1 = require("../utils/response-or-not-found.interceptor");
const photo_url_interceptor_1 = require("../utils/photo-url.interceptor");
const adverts_service_1 = require("./adverts.service");
const create_advert_dto_1 = require("./dto/create-advert.dto");
const filter_advert_dto_1 = require("./dto/filter-advert.dto");
const multer_1 = require("multer");
const path = require("path");
const storage = multer_1.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOADS_FOLDER);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});
let AdvertsController = class AdvertsController {
    constructor(advertsService, configService) {
        this.advertsService = advertsService;
        this.configService = configService;
    }
    getTags() {
        return this.advertsService.getTags();
    }
    create(createAdvertDto, file, req) {
        let photo = null;
        if (file) {
            const publicFolder = this.configService.get('PUBLIC_FOLDER');
            photo = `/${publicFolder}/${file.filename}`;
        }
        return this.advertsService.create(Object.assign(Object.assign({}, createAdvertDto), { photo, user: req.user }));
    }
    findAll(query) {
        return this.advertsService.findAll(query);
    }
    findOne(id) {
        return this.advertsService.findById(id);
    }
    remove(id) {
        return this.advertsService.remove(id);
    }
};
__decorate([
    common_1.Get('tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdvertsController.prototype, "getTags", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('photo', { storage })),
    common_1.UseInterceptors(photo_url_interceptor_1.PhotoUrlInterceptor),
    swagger_1.ApiConsumes('multipart/form-data'),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_advert_dto_1.CreateAdvertDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AdvertsController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.UseInterceptors(photo_url_interceptor_1.PhotoUrlInterceptor),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_advert_dto_1.FilterAdvertDto]),
    __metadata("design:returntype", void 0)
], AdvertsController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.UseInterceptors(response_or_not_found_interceptor_1.ResponseOrNotFoundInterceptor),
    common_1.UseInterceptors(photo_url_interceptor_1.PhotoUrlInterceptor),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdvertsController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_guard_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    common_1.UseInterceptors(response_or_not_found_interceptor_1.ResponseOrNotFoundInterceptor),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdvertsController.prototype, "remove", null);
AdvertsController = __decorate([
    swagger_1.ApiTags('adverts'),
    common_1.Controller('v1/adverts'),
    __metadata("design:paramtypes", [adverts_service_1.AdvertsService,
        config_1.ConfigService])
], AdvertsController);
exports.AdvertsController = AdvertsController;
//# sourceMappingURL=adverts.controller.js.map