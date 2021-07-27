"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeExecutorModule = void 0;
const common_1 = require("@nestjs/common");
const code_token_module_1 = require("../code-token/code-token.module");
const private_files_module_1 = require("../private-files/private-files.module");
const code_executor_controller_1 = require("./code-executor.controller");
const code_executor_service_1 = require("./code-executor.service");
let CodeExecutorModule = class CodeExecutorModule {
};
CodeExecutorModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule,
            private_files_module_1.PrivateFilesModule,
            code_token_module_1.TokenCodeSaveModule,
        ],
        controllers: [code_executor_controller_1.CodeExecutorController],
        providers: [code_executor_service_1.CodeExecutorService]
    })
], CodeExecutorModule);
exports.CodeExecutorModule = CodeExecutorModule;
//# sourceMappingURL=code-executor.module.js.map