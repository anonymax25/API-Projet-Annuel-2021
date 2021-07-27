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
exports.PrivateFilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const private_file_entity_1 = require("./private-file.entity");
const mime_type_1 = require("./utils/mime-type");
let PrivateFilesService = class PrivateFilesService {
    constructor(privateFilesRepository, configService) {
        this.privateFilesRepository = privateFilesRepository;
        this.configService = configService;
    }
    uploadPrivateFile(dataBuffer, ownerId, filename, isResult) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.S3();
            const uploadResult = yield s3.upload({
                Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
                Body: dataBuffer,
                Key: isResult ? filename : `${uuid_1.v4()}-${filename}`
            }).promise();
            if (!isResult) {
                const newFile = this.privateFilesRepository.create({
                    key: uploadResult.Key,
                    owner: {
                        id: ownerId
                    }
                });
                yield this.privateFilesRepository.save(newFile);
                return newFile;
            }
        });
    }
    generatePresignedUrl(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.S3();
            return s3.getSignedUrlPromise('getObject', {
                Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
                ResponseContentType: mime_type_1.default(key),
                Key: key,
            });
        });
    }
    deleteFile(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const s3 = new aws_sdk_1.S3();
            console.log(key);
            let params = {
                Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
                Key: key
            };
            console.log(params);
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    throw new common_1.InternalServerErrorException(err);
                }
                console.log(data);
                return true;
            });
        });
    }
};
PrivateFilesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(private_file_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], PrivateFilesService);
exports.PrivateFilesService = PrivateFilesService;
//# sourceMappingURL=private-files.service.js.map