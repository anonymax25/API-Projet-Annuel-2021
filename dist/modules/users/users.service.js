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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const code_save_service_1 = require("../code-save/code-save.service");
const private_files_service_1 = require("..//private-files/private-files.service");
const typeorm_2 = require("typeorm");
const base_service_1 = require("../../shared/base.service");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService extends base_service_1.BaseService {
    constructor(usersRepository, privateFilesService, codeSaveService) {
        super(user_entity_1.User);
        this.usersRepository = usersRepository;
        this.privateFilesService = privateFilesService;
        this.codeSaveService = codeSaveService;
    }
    fillUser(user, updateUser) {
        user.email = updateUser.email ? updateUser.email : user.email;
        user.name = updateUser.name ? updateUser.name : user.name;
        return user;
    }
    addPrivateFile(userId, imageBuffer, filename, isResult = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privateFilesService.uploadPrivateFile(imageBuffer, userId, filename, isResult);
        });
    }
    getAllPrivateFiles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithFiles = yield this.usersRepository.findOne({
                where: { id: userId },
                relations: ['files']
            });
            if (userWithFiles) {
                return Promise.all(userWithFiles.files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const url = yield this.privateFilesService.generatePresignedUrl(file.key);
                    return {
                        id: file.id,
                        name: file.key.replace(file.key.match(/((\w{4,12}-?)){5}/)[0], ""),
                        key: file.key,
                        url
                    };
                })));
            }
            throw new common_1.NotFoundException('User with this id does not exist');
        });
    }
    getAllCodesByLanguage(userId, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithCodes = yield this.usersRepository.findOne({
                where: { id: userId },
                relations: ['codes']
            });
            if (userWithCodes) {
                return Promise.all(userWithCodes.codes
                    .filter(code => code.language === language)
                    .map((code) => __awaiter(this, void 0, void 0, function* () {
                    return Object.assign({}, code);
                })));
            }
            throw new common_1.NotFoundException('User with this id does not exist');
        });
    }
    addCode(userId, name, code, langage) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.codeSaveService.saveCode(userId, name, code, langage);
        });
    }
    updateCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.codeSaveService.updateCode(code);
        });
    }
    deleteCode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.codeSaveService.deleteCode(id);
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        private_files_service_1.PrivateFilesService,
        code_save_service_1.CodeSaveService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map