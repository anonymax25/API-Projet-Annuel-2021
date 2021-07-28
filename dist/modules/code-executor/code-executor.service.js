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
exports.CodeExecutorService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const code_token_service_1 = require("modules/code-token/code-token.service");
const private_files_service_1 = require("modules/private-files/private-files.service");
const code_execution_1 = require("./entity/code-execution");
const code_result_1 = require("./entity/code-result");
const { CODE_EXECUTOR_URL, CODE_EXECUTOR_PORT } = process.env;
let CodeExecutorService = class CodeExecutorService {
    constructor(httpService, privateFilesService, tokenCodeSaveService) {
        this.httpService = httpService;
        this.privateFilesService = privateFilesService;
        this.tokenCodeSaveService = tokenCodeSaveService;
        this.logger = new common_1.Logger('CodeExecutorService');
        this.codeExecutorClient = axios_1.default.create();
    }
    sendCode(code, username, language, key, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileUrl = yield this.privateFilesService.generatePresignedUrl(key);
            const url = `${CODE_EXECUTOR_URL}:${CODE_EXECUTOR_PORT}/execution`;
            const body = {
                codeExecution: new code_execution_1.CodeExecution(username, code.code, language, fileUrl, key, userId)
            };
            let codeSimilarity = yield this.tokenCodeSaveService.getLowestSimilarityDistance(code, language);
            this.logger.log(`similarity: ${code.id ? code.id : "unsaved"} -> ${codeSimilarity.token ? codeSimilarity.token.codeId : "none found"} = ${codeSimilarity.percent}%`);
            try {
                const response = yield this.httpService.post(url, body).toPromise();
                return new code_result_1.CodeResult(language, response.data, codeSimilarity);
            }
            catch (e) {
                throw new common_1.NotFoundException(e.message);
            }
        });
    }
};
CodeExecutorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        private_files_service_1.PrivateFilesService,
        code_token_service_1.TokenCodeSaveService])
], CodeExecutorService);
exports.CodeExecutorService = CodeExecutorService;
//# sourceMappingURL=code-executor.service.js.map