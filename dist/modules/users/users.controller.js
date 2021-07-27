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
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const jwt_authentication_guard_1 = require("../authentication/passport/jwt-authentication.guard");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const code_dto_1 = require("../code-save/dto/code.dto");
const private_files_service_1 = require("../private-files/private-files.service");
const languages_enum_1 = require("modules/code-executor/entity/languages.enum");
let UsersController = class UsersController {
    constructor(usersService, privateFilesService) {
        this.usersService = usersService;
        this.privateFilesService = privateFilesService;
    }
    getProfile(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ id: request.user.id });
            delete user.password;
            return user;
        });
    }
    getAllPrivateFiles(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.getAllPrivateFiles(request.user.id);
        });
    }
    deletePrivateFiles(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privateFilesService.deleteFile(id);
        });
    }
    getAllCodes(request, language) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.getAllCodesByLanguage(request.user.id, language);
        });
    }
    getUserById(request, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findOne({ id: uid });
            delete user.password;
            return user;
        });
    }
    update(req, updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateUser.id !== req.user.id)
                throw new common_1.ForbiddenException(null, 'Not allowed to modify other users');
            let user = yield this.usersService.findOne({ id: req.user.id });
            const savedUser = yield this.usersService.save(this.usersService.fillUser(user, updateUser));
            delete savedUser.password;
            return savedUser;
        });
    }
    addPrivateFile(request, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.addPrivateFile(request.user.id, file.buffer, file.originalname);
        });
    }
    addPrivateFileById(request, id, isResult, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.addPrivateFile(id, file.buffer, file.originalname, isResult);
        });
    }
    addCode(request, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.addCode(request.user.id, code.name, code.code, code.language);
        });
    }
    updateCode(request, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.updateCode(code);
        });
    }
    deleteCode(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersService.deleteCode(id);
        });
    }
    updateResultFile(request, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.usersService.findOne({ id });
            user.resultKey = body.resultKey;
            const savedUser = yield this.usersService.save(user);
            delete savedUser.password;
            return savedUser;
        });
    }
};
__decorate([
    common_1.UseGuards(jwt_authentication_guard_1.default),
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    common_1.Get('file'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllPrivateFiles", null);
__decorate([
    common_1.Delete('file/:id'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deletePrivateFiles", null);
__decorate([
    common_1.Get('code'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Query('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllCodes", null);
__decorate([
    common_1.UseGuards(jwt_authentication_guard_1.default),
    common_1.Get(':id'),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    common_1.UseGuards(jwt_authentication_guard_1.default),
    common_1.Put(),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUser_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_2.Post('file'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Req()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPrivateFile", null);
__decorate([
    common_2.Post(':id/file'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')), __param(2, common_1.Query('isResult')), __param(3, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPrivateFileById", null);
__decorate([
    common_2.Post('code'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, code_dto_1.CodeDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addCode", null);
__decorate([
    common_1.Put('code'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCode", null);
__decorate([
    common_1.Delete('code/:id'),
    common_1.HttpCode(204),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteCode", null);
__decorate([
    common_1.Put(':id/fileKey'),
    common_1.UseGuards(jwt_authentication_guard_1.default),
    __param(0, common_1.Req()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateResultFile", null);
UsersController = __decorate([
    swagger_1.ApiTags('user'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        private_files_service_1.PrivateFilesService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map