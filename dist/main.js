"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Nodepop API')
        .setDescription('The Nodepop API Swagger Page')
        .setVersion('1.0')
        .addTag('auth')
        .addTag('adverts')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT', 3000);
    await app.listen(port, () => {
        console.log(`Nodepop API running in port ${port}`);
        console.log(`Try me in http://localhost:${port}/swagger`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map