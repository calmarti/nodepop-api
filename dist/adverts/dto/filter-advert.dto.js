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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterAdvertDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const tags_enum_1 = require("../enums/tags.enum");
class FilterAdvertDto {
}
__decorate([
    swagger_1.ApiPropertyOptional(),
    class_transformer_1.Transform(({ value }) => value.trim()),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], FilterAdvertDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ type: Boolean }),
    class_transformer_1.Transform(({ value }) => value === 'true'),
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], FilterAdvertDto.prototype, "sale", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ type: Number, isArray: true }),
    class_transformer_1.Transform(({ value }) => {
        const pricesArray = Array.isArray(value) ? value : [value];
        return pricesArray.map(Number);
    }),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ArrayMaxSize(2),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], FilterAdvertDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ type: String, enum: tags_enum_1.Tags, isArray: true }),
    class_transformer_1.Transform(({ value }) => [...new Set(typeof value === 'string' ? [value] : value)]
        .filter((v) => v)
        .sort()),
    class_validator_1.ArrayNotEmpty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], FilterAdvertDto.prototype, "tags", void 0);
exports.FilterAdvertDto = FilterAdvertDto;
//# sourceMappingURL=filter-advert.dto.js.map