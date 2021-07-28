import { Languages } from '../code-executor/entity/languages.enum';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { CodeSaveService } from './code-save.service';
export declare class CodeSaveController {
    private readonly codeSaveService;
    constructor(codeSaveService: CodeSaveService);
    getCodesByName(request: RequestWithUser, name: string): Promise<import("./code-save.entity").default[]>;
    getAllCodes(request: RequestWithUser, language: Languages): Promise<import("./code-save.entity").default[]>;
}
