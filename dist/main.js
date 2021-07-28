"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./initEnv");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
const download = require("download-git-repo");
function downloadClient() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            download('abdelillah-tech/convertissuer-a-gogo-front#release', './static/prod', (err) => {
                if (err)
                    reject(err);
                resolve(null);
            });
        });
    });
}
const logger = new common_1.Logger('Init');
const { ENV, PORT, API_VERSION } = process.env;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const allowedResponseOrigins = [
            "http://localhost:3000",
            "http://localhost:3003",
            "http://ec2-15-188-232-65.eu-west-3.compute.amazonaws.com"
        ];
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix(`api/v${API_VERSION}`);
        const configSwagger = new swagger_1.DocumentBuilder()
            .setTitle('Projet Annuel API')
            .setDescription('back nestJs de l\'application')
            .setVersion(`${API_VERSION}`)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
        swagger_1.SwaggerModule.setup('api', app, document);
        app.use(morgan('tiny'));
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.enableCors({
            origin: allowedResponseOrigins,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            optionsSuccessStatus: 200,
            allowedHeaders: '*',
        });
        yield app.listen(PORT || 3000).then(() => {
            logger.log(`App started on port ${PORT || 3000}`);
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map