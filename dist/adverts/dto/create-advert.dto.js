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
exports.CreateAdvertDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const tags_enum_1 = require("../enums/tags.enum");
class CreateAdvertDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_transformer_1.Transform(({ value }) => value.trim()),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdvertDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Boolean }),
    class_transformer_1.Transform(({ value }) => ['true', true].includes(value)),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateAdvertDto.prototype, "sale", void 0);
__decorate([
    swagger_1.ApiProperty({ type: Number }),
    class_transformer_1.Transform(({ value }) => Number(value)),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateAdvertDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty({ type: String, enum: tags_enum_1.Tags, isArray: true }),
    class_transformer_1.Transform(({ value }) => [...new Set(typeof value === 'string' ? value.split(',') : value)].sort()),
    class_validator_1.ArrayNotEmpty(),
    __metadata("design:type", Array)
], CreateAdvertDto.prototype, "tags", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ type: String, format: 'binary' }),
    __metadata("design:type", Object)
], CreateAdvertDto.prototype, "photo", void 0);
exports.CreateAdvertDto = CreateAdvertDto;
//# sourceMappingURL=create-advert.dto.js.map