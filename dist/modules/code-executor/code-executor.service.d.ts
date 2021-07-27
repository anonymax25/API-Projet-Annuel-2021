import { HttpService } from '@nestjs/common';
import Code from 'modules/code-save/code-save.entity';
import { TokenCodeSaveService } from 'modules/code-token/code-token.service';
import { PrivateFilesService } from 'modules/private-files/private-files.service';
import { CodeResult } from './entity/code-result';
import { Languages } from './entity/languages.enum';
export declare class CodeExecutorService {
    private httpService;
    private privateFilesService;
    private readonly tokenCodeSaveService;
    private codeExecutorClient;
    private logger;
    constructor(httpService: HttpService, privateFilesService: PrivateFilesService, tokenCodeSaveService: TokenCodeSaveService);
    sendCode(code: Code, username: string, language: Languages, key: string, userId: number): Promise<CodeResult>;
}
