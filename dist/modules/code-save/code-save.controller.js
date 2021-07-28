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
exports.CodeSaveController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const languages_enum_1 = require("modules/code-executor/entity/languages.enum");
const jwt_authentication_guard_1 = require("../authentication/passport/jwt-authentication.guard");
const code_save_service_1 = require("./code-save.service");
let CodeSaveController = class CodeSaveController {
    constructor(codeSaveService) {
        this.codeSaveService = codeSaveService;
    }
    getCodesByName(request, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.codeSaveService.findByName(name);
        });
    }
    getAllCodes(request, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.codeSaveService.findAll();
        });
    }
};
__decorate([
    common_1.Get('code'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CodeSaveController.prototype, "getCodesByName", null);
__decorate([
    common_1.Get('codes'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Query('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CodeSaveController.prototype, "getAllCodes", null);
CodeSaveController = __decorate([
    swagger_1.ApiTags('code-save'),
    common_1.Controller('code-save'),
    __metadata("design:paramtypes", [code_save_service_1.CodeSaveService])
], CodeSaveController);
exports.CodeSaveController = CodeSaveController;
//# sourceMappingURL=code-save.controller.js.map