import { HttpService } from '@nestjs/common';
import { TokenCodeSaveService } from '../code-token/code-token.service';
import { PrivateFilesService } from '../private-files/private-files.service';
import { CodeResult } from './entity/code-result';
import { Languages } from './entity/languages.enum';
export declare class CodeExecutorService {
    private httpService;
    private privateFilesService;
    private readonly tokenCodeSaveService;
    private codeExecutorClient;
    constructor(httpService: HttpService, privateFilesService: PrivateFilesService, tokenCodeSaveService: TokenCodeSaveService);
    sendCode(code: string, username: string, language: Languages, key: string, userId: number): Promise<CodeResult>;
}
