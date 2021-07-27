"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCodeSaveModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const code_token_entity_1 = require("./code-token.entity");
const code_token_service_1 = require("./code-token.service");
let TokenCodeSaveModule = class TokenCodeSaveModule {
};
TokenCodeSaveModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([code_token_entity_1.TokenCode], 'POSTGRES'),
            config_1.ConfigModule,
        ],
        providers: [code_token_service_1.TokenCodeSaveService],
        exports: [code_token_service_1.TokenCodeSaveService]
    })
], TokenCodeSaveModule);
exports.TokenCodeSaveModule = TokenCodeSaveModule;
//# sourceMappingURL=code-token.module.js.map