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
const authentication_module_1 = require("./modules/authentication/authentication.module");
const users_module_1 = require("./modules/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const root_module_1 = require("./modules/root/root.module");
const user_entity_1 = require("./modules/users/user.entity");
const code_executor_module_1 = require("./modules/code-executor/code-executor.module");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const private_file_entity_1 = require("./modules/private-files/private-file.entity");
const code_save_entity_1 = require("./modules/code-save/code-save.entity");
const code_token_entity_1 = require("./modules/code-token/code-token.entity");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, ENV } = process.env;
let POSTGRES_DB_CONFIG;
if (ENV === 'prod') {
    POSTGRES_DB_CONFIG = {
        name: "POSTGRES",
        type: 'postgres',
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        logging: ['error'],
        entities: [user_entity_1.User, private_file_entity_1.default, code_save_entity_1.default, code_token_entity_1.TokenCode],
        synchronize: true,
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    };
}
else {
    POSTGRES_DB_CONFIG = {
        name: "POSTGRES",
        type: 'postgres',
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT),
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        logging: ['error'],
        entities: [user_entity_1.User, private_file_entity_1.default, code_save_entity_1.default, code_token_entity_1.TokenCode],
        synchronize: true
    };
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(POSTGRES_DB_CONFIG),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    AWS_REGION: Joi.string().required(),
                    AWS_ACCESS_KEY_ID: Joi.string().required(),
                    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
                })
            }),
            serve_static_1.ServeStaticModule.forRoot({ rootPath: path_1.join(__dirname, '..', ENV === 'prod' ? './static/prod' : './static/dev') }),
            root_module_1.RootModule,
            authentication_module_1.AuthenticationModule,
            users_module_1.UsersModule,
            code_executor_module_1.CodeExecutorModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map