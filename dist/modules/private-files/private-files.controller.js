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
exports.URL = exports.PrivateFilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_authentication_guard_1 = require("../authentication/passport/jwt-authentication.guard");
const private_files_service_1 = require("./private-files.service");
let PrivateFilesController = class PrivateFilesController {
    constructor(privateFilesService) {
        this.privateFilesService = privateFilesService;
    }
    execute_python(req, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new URL(yield this.privateFilesService.generatePresignedUrl(key), key);
        });
    }
};
__decorate([
    common_1.UseGuards(jwt_authentication_guard_1.default),
    common_1.Get('url/:key'),
    __param(0, common_1.Req()), __param(1, common_1.Param('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PrivateFilesController.prototype, "execute_python", null);
PrivateFilesController = __decorate([
    swagger_1.ApiTags('private-files'),
    common_1.Controller('private-files'),
    __metadata("design:paramtypes", [private_files_service_1.PrivateFilesService])
], PrivateFilesController);
exports.PrivateFilesController = PrivateFilesController;
class URL {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }
}
exports.URL = URL;
//# sourceMappingURL=private-files.controller.js.map