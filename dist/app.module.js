"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const adverts_module_1 = require("./adverts/adverts.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            adverts_module_1.AdvertsModule,
            serve_static_1.ServeStaticModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => [
                    {
                        rootPath: path_1.join(__dirname, '..', configService.get('UPLOADS_FOLDER')),
                        serveRoot: `/${configService.get('PUBLIC_FOLDER')}`,
                    },
                ],
                inject: [config_1.ConfigService],
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map