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
exports.TokenCodeSaveService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const languages_enum_1 = require("../code-executor/entity/languages.enum");
const base_service_1 = require("../../shared/base.service");
const typeorm_2 = require("typeorm");
const code_token_entity_1 = require("./code-token.entity");
const js_constants_1 = require("./utils/js-constants");
let TokenCodeSaveService = class TokenCodeSaveService extends base_service_1.BaseService {
    constructor(tokenCodeSaveRepository, configService) {
        super(code_token_entity_1.TokenCode);
        this.tokenCodeSaveRepository = tokenCodeSaveRepository;
        this.configService = configService;
    }
    saveToken(ownerId, code, langage) {
        return __awaiter(this, void 0, void 0, function* () {
            var token;
            if (langage === languages_enum_1.Languages.javascript)
                token = this.tokenizeJavascript(code);
            if (langage === languages_enum_1.Languages.python)
                token = this.tokenizePython(code);
            const newCode = this.tokenCodeSaveRepository.create({
                token: token,
                langage: langage,
                owner: {
                    id: ownerId
                }
            });
            yield this.tokenCodeSaveRepository.save(newCode);
            return newCode;
        });
    }
    deleteCode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tokenCodeSaveRepository.delete({ id });
        });
    }
    getLowestSimilarityDistance(code, langage) {
        return __awaiter(this, void 0, void 0, function* () {
            var token;
            if (langage === languages_enum_1.Languages.javascript)
                token = this.tokenizeJavascript(code);
            if (langage === languages_enum_1.Languages.python)
                token = this.tokenizePython(code);
        });
    }
    tokenizeJavascript(code) {
        let token = code.replace(js_constants_1.JsConstants.LINE_COMMENT, "")
            .replace(js_constants_1.JsConstants.BLOCK_COMMENT, "")
            .replace(js_constants_1.JsConstants.CONSOLE, "")
            .replace(js_constants_1.JsConstants.BACK_SLASH, "")
            .replace(js_constants_1.JsConstants.STRING, "S")
            .replace(js_constants_1.JsConstants.NUMBER, "N")
            .replace(js_constants_1.JsConstants.VARS, "V")
            .replace(js_constants_1.JsConstants.WHITESPACE, "");
        return token;
    }
    tokenizePython(code) {
        return "TODO";
    }
};
TokenCodeSaveService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(code_token_entity_1.TokenCode)),
    __param(0, typeorm_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], TokenCodeSaveService);
exports.TokenCodeSaveService = TokenCodeSaveService;
//# sourceMappingURL=code-token.service.js.map